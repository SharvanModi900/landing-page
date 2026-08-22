"use client";
import React from "react";
import { Shield, MapPin, Camera, Smartphone, Bell, User, Image, Lock } from "lucide-react";

const SECTIONS = [
  {
    id: "intro",
    title: "Introduction",
    icon: <Shield size={16} />,
    text: `PoPP is a civic reporting app. This policy explains what data we collect and why. We keep things simple and transparent.`,
  },
  {
    id: "data-collected",
    title: "Data We Collect",
    icon: <MapPin size={16} />,
    items: [
      {
        label: "Location",
        icon: <MapPin size={14} />,
        detail: "GPS coordinates and address are collected when you submit a problem. Used to geo-tag your report on the map. Only collected when you actively submit — never in the background.",
      },
      {
        label: "Photos & Videos",
        icon: <Camera size={14} />,
        detail: "Camera and photo library access is used to capture evidence when reporting civic problems. Media is uploaded to our servers as proof.",
      },
      {
        label: "User Account",
        icon: <User size={14} />,
        detail: "An account is created when you sign in. Used as your identity on the platform.",
      },
      {
        label: "Display Name",
        icon: <User size={14} />,
        detail: "Optional. You can set a display name during sign-up or in your profile. Used to show who submitted a problem (unless anonymous).",
      },
      {
        label: "Profile Photo",
        icon: <Image size={14} />,
        detail: "Optional. You can upload an avatar image from your gallery. Stored on our servers.",
      },
      {
        label: "Push Notification Token",
        icon: <Bell size={14} />,
        detail: "A device-specific token is sent to our server so we can notify you about problem updates and community activities.",
      },
      {
        label: "Device Info",
        icon: <Smartphone size={14} />,
        detail: "Device type, OS version, IP address, and app crash logs are collected for analytics and performance optimization.",
      },
    ],
  },
  {
    id: "not-collected",
    title: "Data We Do NOT Collect",
    icon: <Lock size={16} />,
    text: "We do NOT collect: contacts, SMS, call logs, microphone audio, browsing history, personal messages, fitness data, or financial/payment information. We do not sell or share any personal data with third parties.",
  },
  {
    id: "storage",
    title: "How Data Is Stored",
    icon: <Lock size={16} />,
    items: [
      { label: "Auth Token", detail: "Authentication token stored in your device's local storage. Sent with each API request." },
      { label: "Submissions", detail: "Problem reports (text, photos, location) are sent to and stored on our servers." },
    ],
  },
  {
    id: "permissions",
    title: "App Permissions",
    icon: <Smartphone size={16} />,
    items: [
      { label: "Location (Foreground)", detail: "Used to geo-tag problem submissions. Can be revoked anytime in device settings." },
      { label: "Camera", detail: "Used to take photos/videos of civic problems. Can be revoked anytime." },
      { label: "Photo Library", detail: "Used to pick existing photos as evidence. Can be revoked anytime." },
      { label: "Notifications", detail: "Used to send you updates about your submissions. Can be revoked anytime." },
    ],
  },
  {
    id: "deletion",
    title: "Data Deletion",
    icon: <Shield size={16} />,
    text: `You can delete your account and request data removal by visiting our account deletion page or contacting us at sharvanmodi900@gmail.com. All off-chain data (profile, submissions, photos) will be removed within 30 days of your request.`,
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Shield size={16} />,
    text: `For privacy questions or data deletion requests: sharvanmodi900@gmail.com`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* Hero */}
        <section className="relative py-6 px-4 sm:px-6 text-center overflow-hidden border-b border-white/10">
          <div className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Shield className="h-4 w-4 text-cyan-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Privacy Policy</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              What data PoPP collects and why — kept simple and transparent.
            </p>
            <p className="text-[11px] text-gray-500 mt-1.5">Last Updated: August 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400">
                  {section.icon}
                </div>
                <h2 className="text-base font-bold text-white">{section.title}</h2>
              </div>

              {section.text && (
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{section.text}</p>
              )}

              {"items" in section && section.items && (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 text-cyan-400 flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
