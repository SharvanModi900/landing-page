"use client";
import React, { useState } from "react";

export default function SubmissionForm({ onSuccess }: { onSuccess: (data: any) => void }) {
  const [form, setForm] = useState({
    description: "",
    latitude: "",
    longitude: "",
    media_hash: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          media_hash: form.media_hash
        })
      });
      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      onSuccess(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-[#101a2e] rounded-xl p-6 w-full shadow-lg border border-cyan-500/20 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-cyan-300 mb-2">Problem Submission</h2>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
        placeholder="Describe the problem..."
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
      <input
        name="media_hash"
        value={form.media_hash}
        onChange={handleChange}
        className="rounded p-2 bg-[#0e1a2c] text-white border border-cyan-700"
        placeholder="Media Hash"
        required
      />
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
