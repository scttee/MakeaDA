"use client";
import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ConfirmDetails } from "@/components/ConfirmDetails";
import { runRules } from "@/lib/rules";
import { logEvent } from "@/lib/client";

export default function ResultPage() {
  const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("ppg_latest_result") || '{"journey":"talk-to-someone","answers":{}}') : { journey: "talk-to-someone", answers: {} };
  const output = useMemo(() => runRules(data.journey, data.answers), [data.journey, JSON.stringify(data.answers)]);
  if (typeof window !== "undefined") logEvent("result_viewed", { journey: data.journey, pathways: output.likelyPathways.join(",") });

  const share = async () => {
    const text = `Planning Pathway Guide summary\nJourney: ${data.journey}\nLikely pathway: ${output.likelyPathways.join(", ")}\nNext step: ${output.nextSteps[0] ?? "Confirm details"}`;
    await navigator.clipboard.writeText(text);
    logEvent("summary_shared", { journey: data.journey });
  };

  return <Layout>
    <h1 className="text-3xl font-semibold">Your likely pathway</h1>
    <div className="mt-5 rounded-token border p-6">
      <p className="text-sm">Confidence: <strong>{output.confidence}</strong></p>
      <ul className="list-disc pl-6 mt-2">{output.likelyPathways.map((p)=><li key={p}>{p}</li>)}</ul>
      <h2 className="font-semibold mt-4">Why we think this</h2>
      <ul className="list-disc pl-6 mt-2">{output.why.slice(0,3).map((w, i)=><li key={i}>{w}</li>)}</ul>
    </div>
    <section className="mt-6 rounded-token border p-6">
      <h2 className="text-xl font-semibold">What to prepare next</h2>
      {(["always","likely","sometimes"] as const).map((g) => <div key={g} className="mt-3"><h3 className="capitalize font-medium">{g === "always" ? "Always required" : g === "likely" ? "Likely required" : "Sometimes required"}</h3><ul className="list-disc pl-6">{output.checklistItems.filter(i=>i.group===g).map((item, idx)=><li key={idx}>{item.text}{item.reason ? ` — ${item.reason}` : ""}</li>)}</ul></div>)}
    </section>
    <section className="mt-6 rounded-token border p-6">
      <h2 className="text-xl font-semibold">People to contact</h2>
      <ul className="list-disc pl-6">{output.contactOptions.map((c, i)=><li key={i}>{c.href ? <a className="underline" target="_blank" href={c.href}>{c.label}</a> : c.label}</li>)}</ul>
    </section>
    <div className="mt-6 flex gap-3">
      <button className="rounded-token border px-4 py-2" onClick={() => {window.print(); logEvent("checklist_downloaded", { format: "print" });}}>Download checklist</button>
      <button className="rounded-token border px-4 py-2" onClick={share}>Share summary</button>
    </div>
    <ConfirmDetails />
  </Layout>;
}
