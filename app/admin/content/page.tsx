"use client";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { journeys, categories, baseQuestions, journeyExtraQuestions } from "@/data/content";

export default function AdminContent() {
  const [value, setValue] = useState(JSON.stringify({ categories, journeys, baseQuestions, journeyExtraQuestions }, null, 2));
  return <Layout>
    <h1 className="text-3xl font-semibold">Admin content editor (local only)</h1>
    <textarea className="w-full min-h-[480px] border p-3 mt-6 font-mono text-xs" value={value} onChange={(e)=>setValue(e.target.value)} aria-label="Content JSON editor" />
    <button className="mt-4 rounded-token border px-4 py-2" onClick={() => {
      const blob = new Blob([value], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "planning-content.json"; a.click();
      URL.revokeObjectURL(url);
    }}>Export JSON</button>
  </Layout>;
}
