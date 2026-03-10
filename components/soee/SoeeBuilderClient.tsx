"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { SoeeIntroCard } from "@/components/soee/SoeeIntroCard";
import { SoeeQuestionForm } from "@/components/soee/SoeeQuestionForm";
import { SoeeDraftPreview } from "@/components/soee/SoeeDraftPreview";
import { SupportingDocsChecklist } from "@/components/soee/SupportingDocsChecklist";
import { CautionFlagsPanel } from "@/components/soee/CautionFlagsPanel";
import { ExportActions } from "@/components/soee/ExportActions";
import { getSoeeQuestions } from "@/lib/soee/journeySchemas";
import { generateDraft } from "@/lib/soee/generateDraft";
import { SOEE_ENABLED_JOURNEYS } from "@/lib/soee/config";
import { SoeeAnswers } from "@/lib/soee/types";
import { loadAnswers, logEvent, saveAnswers } from "@/lib/client";

export default function SoeeBuilderClient({ journeySlug }: { journeySlug: string }) {
  const valid = SOEE_ENABLED_JOURNEYS.includes(journeySlug as (typeof SOEE_ENABLED_JOURNEYS)[number]);

  const latest = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("ppg_latest_result") || "{}")
    : {};

  const pathwayAnswers = loadAnswers(journeySlug);

  const prefills: SoeeAnswers = {
    proposalSummary: latest?.answers?.worksDescription ?? pathwayAnswers?.worksDescription,
    existingUse: latest?.answers?.existingUse ?? pathwayAnswers?.existingUse,
    proposedUse: latest?.answers?.proposedUse ?? pathwayAnswers?.proposedUse,
    externalChanges: latest?.answers?.externalChanges === "Yes" ? "yes" : latest?.answers?.externalChanges === "No" ? "no" : "notSure",
    heritageStatus: latest?.answers?.heritage === "Yes" ? "yes" : latest?.answers?.heritage === "No" ? "no" : "notSure",
    estimatedCost:
      latest?.answers?.estimatedCost === "Under 50k" ? "under50k" :
      latest?.answers?.estimatedCost === "50k–250k" ? "50to250k" :
      latest?.answers?.estimatedCost === "250k+" ? "over250k" : "notSure"
  };

  const [answers, setAnswers] = useState<SoeeAnswers>({ ...prefills, ...loadAnswers(`soee_${journeySlug}`) });
  const [generated, setGenerated] = useState(false);

  const questions = useMemo(() => getSoeeQuestions(journeySlug), [journeySlug]);
  const draft = useMemo(() => generateDraft(journeySlug, answers), [journeySlug, JSON.stringify(answers)]);

  const onChange = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveAnswers(`soee_${journeySlug}`, next as Record<string, string>);
    logEvent("soee_question_answered", { journeySlug, questionId: id, value });
  };

  const generate = () => {
    setGenerated(true);
    if (typeof window !== "undefined") localStorage.setItem(`ppg_soee_draft_${journeySlug}`, JSON.stringify(draft));
    logEvent("soee_draft_generated", { journeySlug });
  };

  if (!valid) {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold">SoEE Builder unavailable for this journey</h1>
        <p className="mt-2 text-slate-700">This v1 SoEE builder is currently available for extension, fitout and signage only.</p>
        <Link href="/result" className="mt-4 inline-block underline">Back to result</Link>
      </Layout>
    );
  }

  const hasStoredPathway = Boolean(latest?.journey);

  return (
    <Layout>
      <SoeeIntroCard journeySlug={journeySlug} />
      {!hasStoredPathway && <p className="mt-4 text-sm text-slate-700">No saved pathway answers found. You can continue and fill details manually.</p>}
      <SoeeQuestionForm questions={questions} answers={answers} onChange={onChange} />
      <button onClick={generate} className="mt-4 rounded-token bg-primary px-5 py-3 text-white">Generate draft</button>
      {generated && (
        <>
          <CautionFlagsPanel flags={draft.cautionFlags} />
          <SoeeDraftPreview draft={draft} />
          <SupportingDocsChecklist docs={draft.supportingDocs} />
          <ExportActions draft={draft} journeySlug={journeySlug} />
          <Link className="mt-4 inline-block underline" href={`/soee/${journeySlug}/print`}>Open print page</Link>
        </>
      )}
    </Layout>
  );
}
