"use client";
import React, { useState, useEffect } from "react";
import { MapPin, FileText, Upload, Navigation, Loader2, Camera, Video, Image as ImageIcon, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

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

const BACKEND_URL = "https://popp.thharko.com";

const CATEGORIES = {
  infrastructure: { label: "Infrastructure", icon: "🏗️", color: "#f59e0b" },
  health: { label: "Public Health", icon: "🏥", color: "#ef4444" },
  corruption: { label: "Corruption", icon: "🛡️", color: "#8b5cf6" },
  environment: { label: "Environment", icon: "🌿", color: "#22c55e" },
  education: { label: "Education", icon: "🏫", color: "#3b82f6" },
  legal: { label: "Legal", icon: "⚖️", color: "#ec4899" },
  other: { label: "Other", icon: "⚪", color: "#6b7280" },
};

type Category = keyof typeof CATEGORIES;

export default function SubmissionForm({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "detecting" | "denied" | "success">("idle");

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      setLocationStatus("detecting");
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          // Reverse geocode to get address
          let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            if (res.ok) {
              const data = await res.json();
              address = data.display_name || address;
            }
          } catch {}
          setLocation({ lat, lng, address });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      // Generate previews for image files
      newFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          setFilePreviews((prev) => [...prev, url]);
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  const canProceedToStep2 = () => {
    return title.trim() && description.trim() && category && location;
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !location) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let media_hash = "";
      let media: string[] = [];
      if (files.length > 0) {
        media_hash = await hashFile(files[0]);
        // Convert first file to base64 data URI
        const base64 = await fileToBase64(files[0]);
        media = [base64];
      }

      const res = await fetch(`${BACKEND_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          latitude: location.lat,
          longitude: location.lng,
          landmark_name: location.address,
          category,
          media_hash: media_hash || undefined,
          media: media.length > 0 ? media : undefined,
          anonymous: isAnonymous,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      onSuccess(data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory(null);
      setIsAnonymous(true);
      setFiles([]);
      setFilePreviews([]);
      setStep(1);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-8 mb-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s <= step
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-gray-500 border border-white/10"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
            <span className={`text-xs font-medium ${s <= step ? "text-cyan-400" : "text-gray-600"}`}>
              {s === 1 ? "Details" : s === 2 ? "Evidence" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          {/* Category Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <FileText className="w-4 h-4 text-cyan-400" />
              Category *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => {
                const isActive = category === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-2 shadow-lg"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                    }`}
                    style={
                      isActive
                        ? { borderColor: cat.color, backgroundColor: cat.color + "20", boxShadow: `0 4px 12px ${cat.color}20` }
                        : {}
                    }
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
              placeholder="Brief description of the problem"
              maxLength={100}
              required
            />
            <div className="text-xs text-gray-500 text-right mt-1">{title.length}/100</div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
              placeholder="Provide details: what, where, when, who is affected..."
              maxLength={1000}
              required
            />
            <div className="text-xs text-gray-500 text-right mt-1">{description.length}/1000</div>
          </div>

          {/* Anonymous Toggle */}
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              {isAnonymous ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-cyan-400" />}
              <div className="text-left">
                <div className="text-sm font-medium text-white">
                  {isAnonymous ? "Anonymous" : "Verified Identity"}
                </div>
                <div className="text-xs text-gray-500">
                  {isAnonymous ? "Your identity will be hidden" : "Your identity will be visible"}
                </div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-all ${
                isAnonymous ? "bg-cyan-500" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isAnonymous ? "translate-x-5" : "translate-x-0.5"
                } mt-0.5`}
              />
            </div>
          </button>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Location
            </label>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              {locationStatus === "detecting" ? (
                <>
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-sm text-gray-400">Detecting location...</span>
                </>
              ) : locationStatus === "success" && location ? (
                <>
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300 flex-1 truncate">{location.address}</span>
                  <button
                    type="button"
                    onClick={detectLocation}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-500 flex-1">Location unavailable</span>
                  <button
                    type="button"
                    onClick={detectLocation}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Retry
                  </button>
                </>
              )}
            </div>
            {locationStatus === "denied" && (
              <div className="flex items-center gap-2 mt-2 text-xs text-amber-400">
                <AlertCircle className="w-3 h-3" />
                Location access denied — enable in browser settings
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!canProceedToStep2()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            Next: Add Evidence
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Evidence */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              Add Evidence (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Photos with GPS will auto-verify location. Image date, camera info & coordinates are extracted automatically.
            </p>

            {/* Evidence Preview */}
            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    {filePreviews[index] ? (
                      <img
                        src={filePreviews[index]}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-lg border border-white/10"
                      />
                    ) : (
                      <div className="w-full h-24 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                        <FileText className="w-8 h-8 text-cyan-400" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-white text-xs">×</span>
                    </button>
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 rounded text-xs text-white">
                      {file.type.startsWith("image/") ? "📷" : file.type.startsWith("video/") ? "🎥" : "📄"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*,.pdf,audio/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <span className="text-sm text-gray-400">Drop files or click to upload</span>
                <span className="text-xs text-gray-600 block mt-1">Images, video, PDF, audio</span>
              </div>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 transition-all"
            >
              <Navigation className="w-4 h-4 rotate-180" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              Next: Review
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Review Your Submission
            </label>

            <div className="space-y-4 p-5 rounded-xl bg-white/5 border border-white/10">
              {/* Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Category</span>
                {category && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: CATEGORIES[category].color + "20" }}
                  >
                    <span className="text-lg">{CATEGORIES[category].icon}</span>
                    <span className="text-sm font-medium" style={{ color: CATEGORIES[category].color }}>
                      {CATEGORIES[category].label}
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Title</div>
                <div className="text-sm text-white">{title}</div>
              </div>

              {/* Description */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</div>
                <div className="text-sm text-gray-300 line-clamp-3">{description}</div>
              </div>

              {/* Identity */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Identity</span>
                <span className="text-sm text-white">{isAnonymous ? "Anonymous" : "Verified"}</span>
              </div>

              {/* Location */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</div>
                <div className="text-sm text-gray-300 truncate">
                  {location ? location.address : "Not available"}
                </div>
              </div>

              {/* Evidence */}
              {files.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Evidence</span>
                  <span className="text-sm text-white">{files.length} file(s) attached</span>
                </div>
              )}
            </div>
          </div>

          {/* PoP-ID Preview */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xs text-gray-400">
              PoP-ID will be generated: <span className="text-cyan-400 font-mono">pop://.../{category || "category"}/hash</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 transition-all"
            >
              <Navigation className="w-4 h-4 rotate-180" />
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Submit Problem
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-600 text-center">
            By submitting, you agree to the PoPP Protocol terms. All submissions are
            cryptographically hashed.
          </p>
        </div>
      )}
    </div>
  );
}
