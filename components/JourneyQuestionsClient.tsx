"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { baseQuestions, journeyExtraQuestions } from "@/data/content";
import { logEvent, saveAnswers, loadAnswers } from "@/lib/client";
import { Layout } from "@/components/Layout";

export default function JourneyQuestionsClient({ slug }: { slug: string }) {
  const router = useRouter();
  const questions = useMemo(() => [...baseQuestions, ...(journeyExtraQuestions[slug] ?? [])], [slug]);
  const [answers, setAnswers] = useState<Record<string, string>>(() => (typeof window === "undefined" ? {} : loadAnswers(slug)));

  const onChange = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveAnswers(slug, next);
    logEvent("question_answered", { journey: slug, questionId: id, value });
  };

  const submit = () => {
    localStorage.setItem("ppg_latest_result", JSON.stringify({ journey: slug, answers }));
    router.push("/result");
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Questions</h1>
      <p className="mt-2 text-sm text-slate-700">Answer a short set of questions. Choose <strong>Not sure</strong> whenever needed.</p>
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
