"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseQuestions, journeyExtraQuestions } from "@/data/content";
import { logEvent, saveAnswers, loadAnswers } from "@/lib/client";
import { Layout } from "@/components/Layout";

const DEFAULT_CORE = ["propertyType", "externalChanges", "heritage", "scale", "estimatedCost", "publicDomainImpact", "conceptReady", "confidence"];

const CORE_BY_JOURNEY: Record<string, string[]> = {
  "build-new": ["propertyType", "heritage", "scale", "estimatedCost", "neighbourImpacts", "conceptReady", "confidence"],
  "renovate-inside": ["propertyType", "heritage", "estimatedCost", "conceptReady", "confidence"],
  extension: ["propertyType", "externalChanges", "heritage", "scale", "estimatedCost", "neighbourImpacts", "conceptReady", "confidence"],
  "granny-flat": ["propertyType", "externalChanges", "heritage", "scale", "estimatedCost", "neighbourImpacts", "conceptReady", "confidence"],
  "deck-pergola-carport": ["propertyType", "externalChanges", "heritage", "estimatedCost", "publicDomainImpact", "conceptReady", "confidence"],
  "pool-spa": ["propertyType", "externalChanges", "heritage", "estimatedCost", "neighbourImpacts", "conceptReady", "confidence"],
  demolition: ["propertyType", "heritage", "scale", "estimatedCost", "conceptReady", "confidence"],
  "change-exterior": ["propertyType", "externalChanges", "heritage", "scale", "estimatedCost", "neighbourImpacts", "conceptReady", "confidence"],
  "heritage-works": ["propertyType", "externalChanges", "heritage", "scale", "estimatedCost", "conceptReady", "confidence"],
  fitout: ["propertyType", "changeOfUse", "heritage", "scale", "estimatedCost", "publicDomainImpact", "conceptReady", "confidence"],
  "change-use": ["propertyType", "changeOfUse", "heritage", "scale", "estimatedCost", "publicDomainImpact", "conceptReady", "confidence"],
  "outdoor-dining": ["propertyType", "changeOfUse", "heritage", "publicDomainImpact", "conceptReady", "confidence"],
  signage: ["propertyType", "externalChanges", "heritage", "publicDomainImpact", "conceptReady", "confidence"],
  "trading-hours-pom": ["propertyType", "changeOfUse", "scale", "publicDomainImpact", "conceptReady", "confidence"],
  "modify-approved": ["propertyType", "externalChanges", "heritage", "scale", "conceptReady", "confidence"],
  "start-building": ["propertyType", "scale", "conceptReady", "confidence"],
  lookup: [],
  "talk-to-someone": ["propertyType", "changeOfUse", "heritage", "conceptReady", "confidence"],
  "strata-apartment": ["propertyType", "externalChanges", "heritage", "estimatedCost", "conceptReady", "confidence"]
};

export default function JourneyQuestionsClient({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedScenario = searchParams.get("scenario") ?? "";
  const selectedScenarioLabel = searchParams.get("scenarioLabel") ?? "";

  const coreIds = CORE_BY_JOURNEY[slug] ?? DEFAULT_CORE;
  const questions = useMemo(
    () => [...baseQuestions.filter((q) => coreIds.includes(q.id)), ...(journeyExtraQuestions[slug] ?? [])],
    [slug, coreIds],
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() => (typeof window === "undefined" ? {} : loadAnswers(slug)));

  const onChange = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveAnswers(slug, next);
    logEvent("question_answered", { journey: slug, questionId: id, value });
  };

  const submit = () => {
    localStorage.setItem("ppg_latest_result", JSON.stringify({ journey: slug, answers, selectedScenario, selectedScenarioLabel }));
    router.push("/result");
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Questions</h1>
      <p className="mt-2 text-sm text-slate-700">Answer this tailored question set for your selected pathway. Choose <strong>Not sure</strong> whenever needed.</p>
      {selectedScenarioLabel && (
        <p className="mt-2 inline-flex rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs text-slate-700">
          Common scenario selected: {selectedScenarioLabel}
        </p>
      )}
      <p className="mt-1 text-xs text-slate-500">Question set: {questions.length} questions</p>
      <div className="mt-6 space-y-5">
        {questions.map((q, index) => (
          <fieldset key={q.id} className="rounded-token border border-slate-200 bg-white p-4 shadow-sm">
            <legend className="font-medium">{index + 1}. {q.text}</legend>
            {q.helpText && <p className="mt-1 text-xs text-slate-600">{q.helpText}</p>}
            {q.type === "text" ? (
              <input id={q.id} aria-label={q.text} className="mt-2 w-full rounded-md border border-slate-300 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} />
            ) : (
              <select id={q.id} aria-label={q.text} className="mt-2 w-full rounded-md border border-slate-300 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)}>
                <option value="">Select one</option>
                {q.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </fieldset>
        ))}
      </div>
      <button onClick={submit} className="mt-6 rounded-token bg-primary px-5 py-3 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
        See result
      </button>
    </Layout>
  );
}
