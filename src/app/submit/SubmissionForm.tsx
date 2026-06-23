// "use client";
// import React, { useState } from "react";

// export default function SubmissionForm({ onSuccess }: { onSuccess: (data: any) => void }) {
//   const [form, setForm] = useState({
//     description: "",
//     latitude: "",
//     longitude: "",
//     media_hash: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       //http://35.154.1.21:4000
//       //http://localhost:4000/api/submissions
//       const res = await fetch("http://35.154.1.21:4000/api/submissions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           description: form.description,
//           latitude: parseFloat(form.latitude),
//           longitude: parseFloat(form.longitude),
//           media_hash: form.media_hash
//         })
//       });
//       if (!res.ok) throw new Error("Submission failed");
//       const data = await res.json();
//       onSuccess(data);
//     } catch (err: any) {
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="bg-[#101a2e] rounded-xl p-3 w-full shadow-lg border border-cyan-500/20 flex flex-col gap-4" onSubmit={handleSubmit}>
//       <h2 className="text-xl font-bold text-cyan-300 mb-2">Problem Submission</h2>
//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
//         placeholder="Describe the problem..."
//         required
//       />
//       <div className="flex gap-2">
//         <input
//           name="latitude"
//           value={form.latitude}
//           onChange={handleChange}
//           className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
//           placeholder="Latitude"
//           type="number"
//           step="any"
//           required
//         />
//         <input
//           name="longitude"
//           value={form.longitude}
//           onChange={handleChange}
//           className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
//           placeholder="Longitude"
//           type="number"
//           step="any"
//           required
//         />
//       </div>
//       <input
//         name="media_hash"
//         value={form.media_hash}
//         onChange={handleChange}
//         className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
//         placeholder="Media Hash"
//         required
//       />
//       {error && <div className="text-red-400 text-sm">{error}</div>}
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded mt-2 disabled:opacity-60"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Process"}
//       </button>
//     </form>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";

// export default function SubmissionForm({
//   onSuccess,
// }: {
//   onSuccess: (data: any) => void;
// }) {
//   const [form, setForm] = useState({
//     description: "",
//     latitude: "",
//     longitude: "",
//   });
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Auto detect location on mount
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setForm((prev) => ({
//             ...prev,
//             latitude: pos.coords.latitude.toString(),
//             longitude: pos.coords.longitude.toString(),
//           }));
//         },
//         (err) => {
//           console.warn("Location access denied:", err.message);
//         }
//       );
//     } else {
//       console.warn("Geolocation not supported");
//     }
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Append files (supports multiple + one-by-one uploads)
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("description", form.description);
//       formData.append("latitude", form.latitude);
//       formData.append("longitude", form.longitude);

//       files.forEach((file, index) => {
//         formData.append("evidence", file); // backend must accept multiple
//       });

//       const res = await fetch("http://35.154.1.21:4000/api/submissions", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Submission failed");
//       const data = await res.json();
//       onSuccess(data);
//       setFiles([]); // reset after success
//       setForm({ description: "", latitude: form.latitude, longitude: form.longitude });
//     } catch (err: any) {
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       className="bg-[#101a2e] rounded-xl p-3 w-full shadow-lg border border-cyan-500/20 flex flex-col gap-4"
//       onSubmit={handleSubmit}
//     >
//       <h2 className="text-xl font-bold text-cyan-300 mb-2">
//         Problem Submission
//       </h2>

//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
//         placeholder="Describe the problem..."
//         required
//       />

//       <div className="flex gap-2">
//         <input
//           name="latitude"
//           value={form.latitude}
//           onChange={handleChange}
//           className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
//           placeholder="Latitude"
//           type="number"
//           step="any"
//           required
//         />
//         <input
//           name="longitude"
//           value={form.longitude}
//           onChange={handleChange}
//           className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
//           placeholder="Longitude"
//           type="number"
//           step="any"
//           required
//         />
//       </div>

//       {/* File Upload */}
//       <input
//         type="file"
//         accept="image/*,video/*,.pdf,audio/*"
//         multiple
//         onChange={handleFileChange}
//         className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
//       />

//       {files.length > 0 && (
//         <ul className="text-cyan-400 text-sm list-disc list-inside">
//           {files.map((file, i) => (
//             <li key={i}>{file.name}</li>
//           ))}
//         </ul>
//       )}

//       {error && <div className="text-red-400 text-sm">{error}</div>}

//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded mt-2 disabled:opacity-60"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Process"}
//       </button>
//     </form>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";

// Utility: compute SHA-256 hash of a file
async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState<"idle" | "detecting" | "denied" | "success">("idle");

  // Auto detect location on mount
  useEffect(() => {
    // Only attempt geolocation if fields are empty
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
        (err) => {
          console.warn("Location access denied:", err.message);
          setLocationStatus("denied");
          // Don't show error to user automatically, let them choose to enable it
        }
      );
    } else {
      console.warn("Geolocation not supported");
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
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let media_hash = "";
      if (file) {
        media_hash = await hashFile(file);
      }

      const res = await fetch("http://35.154.1.21:4000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          media_hash,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      onSuccess(data);

      // reset after success
      setForm({ description: "", latitude: "", longitude: "" });
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-[#101a2e] rounded-xl p-3 w-full shadow-lg border border-cyan-500/20 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-cyan-300 mb-2">Problem Submission</h2>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
        placeholder="Write problem with details. Include pincode, area name, landmark, and any other relevant information."
        required
      />

      <div className="flex gap-2">
        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
          placeholder="Latitude"
          type="number"
          step="any"
          required
        />
        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700 w-1/2"
          placeholder="Longitude"
          type="number"
          step="any"
          required
        />
      </div>

      {/* Location detection button */}
      <div className="flex items-center gap-2">
        {locationStatus === "detecting" ? (
          <button
            type="button"
            className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded"
            disabled
          >
            Detecting location...
          </button>
        ) : (
          <button
            type="button"
            onClick={detectLocation}
            className="text-xs bg-cyan-900/50 hover:bg-cyan-800 text-cyan-300 px-2 py-1 rounded"
          >
            {locationStatus === "success" ? "📍 Location Detected" : "📍 Detect My Location"}
          </button>
        )}
        {locationStatus === "denied" && (
          <span className="text-xs text-amber-400">
            Location access denied. Enable in browser settings.
          </span>
        )}
      </div>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*,video/*,.pdf,audio/*"
        onChange={handleFileChange}
        className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
      />

      {file && (
        <div className="text-cyan-400 text-sm">{file.name}</div>
      )}

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Processing..." : "Process"}
      </button>
    </form>
  );
}
