"use client";
import React, { useState, useEffect } from "react";
import { MapPin, FileText, Upload, Navigation, Loader2 } from "lucide-react";

async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const BACKEND_URL = "http://35.154.1.21:4000";

export default function SubmissionForm({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) {
  const [form, setForm] = useState({
    description: "",
    latitude: "",
    longitude: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "detecting" | "denied" | "success"
  >("idle");

  useEffect(() => {
    if (!form.latitude && !form.longitude) {
      detectLocation();
    }
  }, []);

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      setLocationStatus("detecting");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          }));
          setLocationStatus("success");
        },
        () => {
          setLocationStatus("denied");
        }
      );
    } else {
      setLocationStatus("denied");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      // Generate preview for image files
      if (f.type.startsWith("image/")) {
        const url = URL.createObjectURL(f);
        setFilePreview(url);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let media_hash = "";
      let media_url = "";
      if (file) {
        media_hash = await hashFile(file);
        // Upload image to S3 via backend upload endpoint
        try {
          const base64 = await fileToBase64(file);
          const uploadRes = await fetch(`${BACKEND_URL}/api/upload/image`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64, category: "evidence" }),
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            media_url = uploadData.url || "";
          } else {
            console.warn("Image upload failed, submitting without image URL");
          }
        } catch (uploadErr) {
          console.warn("Image upload error:", uploadErr);
        }
      }

      const res = await fetch(`${BACKEND_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          media_hash,
          media_url,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      onSuccess(data);
      setForm({ description: "", latitude: "", longitude: "" });
      setFile(null);
      setFilePreview(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Description */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Problem Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
          placeholder="Describe the problem with details — include area name, landmark, pincode, and how it affects people..."
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Location
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
            placeholder="Latitude"
            type="number"
            step="any"
            required
          />
          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
            placeholder="Longitude"
            type="number"
            step="any"
            required
          />
        </div>
        {/* Detect Location Button */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={detectLocation}
            disabled={locationStatus === "detecting"}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {locationStatus === "detecting" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Navigation className="w-3 h-3" />
            )}
            {locationStatus === "detecting"
              ? "Detecting..."
              : locationStatus === "success"
              ? "Location Detected"
              : "Auto-detect"}
          </button>
          {locationStatus === "denied" && (
            <span className="text-xs text-amber-400/80">
              Location access denied — enable in browser settings
            </span>
          )}
          {locationStatus === "success" && form.latitude && (
            <span className="text-xs text-green-400/80">
              {form.latitude}, {form.longitude}
            </span>
          )}
        </div>
      </div>

      {/* Evidence Upload */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Upload className="w-4 h-4 text-cyan-400" />
          Evidence (optional)
        </label>
        <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*,video/*,.pdf,audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center gap-3">
              {filePreview ? (
                <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
              ) : (
                <FileText className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              )}
              <div>
                <span className="text-sm text-white block">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-6 h-6 text-gray-500 mx-auto mb-1" />
              <span className="text-sm text-gray-500">
                Drop file or click to upload
              </span>
              <span className="text-xs text-gray-600 block">
                Images, video, PDF, audio
              </span>
            </div>
          )}
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white disabled:opacity-60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit Problem"
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        By submitting, you agree to the PoPP Protocol terms. All submissions are
        cryptographically hashed.
      </p>
    </form>
  );
}
