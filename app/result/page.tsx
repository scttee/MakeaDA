"use client";

import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ConfirmDetails } from "@/components/ConfirmDetails";
import { runRules } from "@/lib/rules";
import { logEvent } from "@/lib/client";

const PATHWAY_LABELS: Record<string, string> = {
  DA: "Development Application (DA) pathway",
  possibleExemptOrComplying: "Possible exempt or complying pathway",
  modification: "Modify an approved DA (s4.55)",
  buildingCertificate: "Building certificate pathway",
  constructionCertificate: "Construction certificate pathway",
  talkToPlanner: "Talk to a duty planner",
  lookup: "Lookup mode"
};

export default function ResultPage() {
  const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("ppg_latest_result") || '{"journey":"talk-to-someone","answers":{}}') : { journey: "talk-to-someone", answers: {} };
  const output = useMemo(() => runRules(data.journey, data.answers), [data.journey, JSON.stringify(data.answers)]);
  if (typeof window !== "undefined") logEvent("result_viewed", { journey: data.journey, pathways: output.likelyPathways.join(",") });

  const share = async () => {
    const text = `Planning Pathway Guide summary\nJourney: ${data.journey}\nLikely pathway: ${output.likelyPathways.map((p: string) => PATHWAY_LABELS[p] ?? p).join(", ")}\nNext step: ${output.nextSteps[0] ?? "Confirm details"}`;
    await navigator.clipboard.writeText(text);
    logEvent("summary_shared", { journey: data.journey });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Your likely pathway</h1>
      <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm">Confidence: <strong className="capitalize">{output.confidence}</strong></p>
        <ul className="mt-2 list-disc pl-6">
          {output.likelyPathways.map((p) => <li key={p}>{PATHWAY_LABELS[p] ?? p}</li>)}
        </ul>
        <h2 className="mt-4 font-semibold">Why we think this</h2>
        <ul className="mt-2 list-disc pl-6">{output.why.slice(0, 3).map((w, i) => <li key={i}>{w}</li>)}</ul>
      </section>

      <section className="mt-6 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">What to prepare next</h2>
        {(["always", "likely", "sometimes"] as const).map((g) => (
          <div key={g} className="mt-4">
            <h3 className="font-medium">{g === "always" ? "Always required" : g === "likely" ? "Likely required" : "Sometimes required"}</h3>
            <ul className="list-disc pl-6">
              {output.checklistItems.filter((i) => i.group === g).map((item, idx) => <li key={idx}>{item.text}{item.reason ? ` — ${item.reason}` : ""}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">People to contact</h2>
        <ul className="list-disc pl-6">
          {output.contactOptions.map((c, i) => (
            <li key={i}>
              {c.href ? <a className="underline decoration-slate-400 underline-offset-2 hover:decoration-primary" target="_blank" rel="noreferrer" href={c.href}>{c.label}</a> : c.label}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-token border border-slate-300 bg-white px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" onClick={() => { window.print(); logEvent("checklist_downloaded", { format: "print" }); }}>Download checklist</button>
        <button className="rounded-token border border-slate-300 bg-white px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" onClick={share}>Share summary</button>
      </div>

      <div className="mt-6">
        <ConfirmDetails />
      </div>
    </Layout>
  );
}
