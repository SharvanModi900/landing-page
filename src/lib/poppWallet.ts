/**
 * PoPP Built-in Wallet Service
 * Mirrors mobile wallet — 24-word phrase is the only credential.
 * Mnemonic encrypted with auto-generated AES-GCM key (Web Crypto API).
 * No PIN — matches mobile app's transparent storage approach.
 *
 * Uses: @scure/bip39, @scure/bip32, @noble/hashes, bech32, Web Crypto API
 */

import { ripemd160 } from "@noble/hashes/legacy.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { HDKey } from "@scure/bip32";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { bech32 } from "bech32";

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "popp_builtin_wallet";
const ENC_KEY_NAME = "popp_enc_key";
const BECH32_PREFIX = "popp";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WalletData {
  address: string;
  mnemonic: string;
}

interface StoredWallet {
  iv: string;       // AES-GCM IV (hex)
  enc: string;      // AES-GCM ciphertext (base64)
  address: string;
  version: 3;       // v3 = auto-key AES-GCM (no PIN)
}

// ─── Crypto Helpers ──────────────────────────────────────────────────────────

function toHex(buf: Uint8Array): string {
  return Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));
}

function toBase64(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf));
}

function fromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  return new Uint8Array(bin.split("").map(c => c.charCodeAt(0)));
}

/**
 * Get or create the AES encryption key.
 * Key is stored in IndexedDB (survives page reload, not exported like localStorage).
 * This matches mobile's SecureStore — transparent to the user.
 */
async function getEncryptionKey(): Promise<CryptoKey> {
  // Try to load from IndexedDB
  const db = await openKeyDB();
  const stored = await idbGet(db, ENC_KEY_NAME);
  if (stored) return stored as CryptoKey;

  // Generate new key
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    false, // not extractable
    ["encrypt", "decrypt"]
  );
  await idbSet(db, ENC_KEY_NAME, key);
  return key;
}

async function encryptMnemonic(mnemonic: string): Promise<{ iv: string; enc: string }> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getEncryptionKey();
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    enc.encode(mnemonic)
  );
  return { iv: toHex(iv), enc: toBase64(new Uint8Array(ciphertext)) };
}

async function decryptMnemonic(stored: StoredWallet): Promise<string> {
  const dec = new TextDecoder();
  const iv = fromHex(stored.iv);
  const ciphertext = fromBase64(stored.enc);
  const key = await getEncryptionKey();
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    ciphertext as BufferSource
  );
  return dec.decode(plaintext);
}

// ─── Minimal IndexedDB wrapper for CryptoKey storage ─────────────────────────

function openKeyDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("popp-wallet-keys", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("keys");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(db: IDBDatabase, key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readonly");
    const req = tx.objectStore("keys").get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbSet(db: IDBDatabase, key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readwrite");
    const req = tx.objectStore("keys").put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbDelete(db: IDBDatabase, key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keys", "readwrite");
    const req = tx.objectStore("keys").delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ─── Address Derivation (pure JS, matches mobile) ────────────────────────────

export function deriveAddress(mnemonic: string, prefix: string = BECH32_PREFIX): string {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hd = HDKey.fromMasterSeed(seed);
  const child = hd.derive("m/44'/118'/0'/0/0");
  const pubKey = child.publicKey;
  if (!pubKey) throw new Error("Failed to derive public key");
  const sha = sha256(pubKey);
  const rip = ripemd160(sha);
  const words = bech32.toWords(rip);
  return bech32.encode(prefix, words);
}

// ─── In-Memory Mnemonic Cache ────────────────────────────────────────────────
// Holds decrypted mnemonic for signing. Cleared on tab close.

let _cachedMnemonic: string | null = null;

// ─── Wallet Service ──────────────────────────────────────────────────────────

export const poppWallet = {
  /**
   * Check if a wallet exists in localStorage.
   */
  hasWallet(): boolean {
    try {
      return !!localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  },

  /**
   * Get stored address (without decrypting mnemonic).
   */
  getAddress(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const stored: StoredWallet = JSON.parse(raw);
      return stored.address || null;
    } catch {
      return null;
    }
  },

  /**
   * Get full wallet data by decrypting mnemonic.
   * Caches mnemonic in memory for subsequent calls.
   */
  async getWallet(): Promise<WalletData | null> {
    if (_cachedMnemonic) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const stored: StoredWallet = JSON.parse(raw);
      return { address: stored.address, mnemonic: _cachedMnemonic };
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const stored: StoredWallet = JSON.parse(raw);
      const mnemonic = await decryptMnemonic(stored);
      _cachedMnemonic = mnemonic;
      return { address: stored.address, mnemonic };
    } catch {
      return null;
    }
  },

  /**
   * Generate a new mnemonic + address WITHOUT storing.
   */
  generateMnemonic(): WalletData {
    const mnemonic = bip39.generateMnemonic(wordlist, 256); // 24 words
    const address = deriveAddress(mnemonic);
    return { address, mnemonic };
  },

  /**
   * Create a new wallet and store (encrypted with auto-key).
   */
  async createWallet(): Promise<WalletData> {
    const mnemonic = bip39.generateMnemonic(wordlist, 256);
    const address = deriveAddress(mnemonic);

    const { iv, enc } = await encryptMnemonic(mnemonic);
    const stored: StoredWallet = { iv, enc, address, version: 3 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    _cachedMnemonic = mnemonic;
    return { address, mnemonic };
  },

  /**
   * Import a wallet from mnemonic, encrypt and store.
   */
  async importWallet(mnemonic: string): Promise<WalletData> {
    const trimmed = mnemonic.trim().toLowerCase();
    const words = trimmed.split(/\s+/);
    if (words.length !== 12 && words.length !== 24) {
      throw new Error("Invalid recovery phrase. Must be 12 or 24 words.");
    }
    if (!bip39.validateMnemonic(trimmed, wordlist)) {
      throw new Error("Invalid recovery phrase. Please check your words and try again.");
    }

    const address = deriveAddress(trimmed);
    const { iv, enc } = await encryptMnemonic(trimmed);
    const stored: StoredWallet = { iv, enc, address, version: 3 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    _cachedMnemonic = trimmed;
    return { address, mnemonic: trimmed };
  },

  /**
   * Delete wallet data + encryption key (irreversible).
   */
  async deleteWallet(): Promise<void> {
    _cachedMnemonic = null;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("popp-wallet");
    try {
      const db = await openKeyDB();
      await idbDelete(db, ENC_KEY_NAME);
    } catch { /* ignore */ }
  },

  /**
   * Get an Amino offline signer for transaction signing.
   */
  async getOfflineSigner() {
    let mnemonic = _cachedMnemonic;
    if (!mnemonic) {
      const wallet = await this.getWallet();
      if (!wallet) throw new Error("No wallet found");
      mnemonic = wallet.mnemonic;
    }
    const amino = await import("@cosmjs/amino");
    return amino.Secp256k1HdWallet.fromMnemonic(mnemonic!, { prefix: BECH32_PREFIX });
  },
};

export default poppWallet;
