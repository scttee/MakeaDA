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
      <p className="mt-2 text-sm">Answer a short set of questions. "Not sure" is okay.</p>
      <div className="mt-6 space-y-5">
        {questions.map((q) => (
          <div key={q.id} className="rounded-token border p-4">
            <label className="font-medium" htmlFor={q.id}>
              {q.text}
            </label>
            {q.helpText && <p className="mt-1 text-xs">{q.helpText}</p>}
            {q.type === "text" ? (
              <input id={q.id} className="mt-2 w-full border p-2" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} />
            ) : (
              <select id={q.id} className="mt-2 w-full border p-2" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)}>
                <option value="">Select one</option>
                {q.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      <button onClick={submit} className="mt-6 rounded-token bg-primary px-5 py-3 text-white focus:outline focus:outline-2 focus:outline-secondary">
        See result
      </button>
    </Layout>
  );
}
