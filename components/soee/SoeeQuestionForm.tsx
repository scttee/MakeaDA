"use client";

import { SoeeQuestion, SoeeAnswers } from "@/lib/soee/types";

export const SoeeQuestionForm = ({
  questions,
  answers,
  onChange
}: {
  questions: SoeeQuestion[];
  answers: SoeeAnswers;
  onChange: (id: string, value: string) => void;
}) => (
  <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold">SoEE questions</h2>
    <div className="mt-4 space-y-4">
      {questions.map((q) => {
        if (q.when?.equals && answers[q.when.field] !== q.when.equals) return null;
        if (q.when?.anyOf && !q.when.anyOf.includes(String(answers[q.when.field] ?? ""))) return null;

        return (
          <div key={q.id}>
            <label className="font-medium" htmlFor={q.id}>{q.label}</label>
            {q.helpText && <p className="text-xs text-slate-600">{q.helpText}</p>}
            {q.type === "textarea" && (
              <textarea id={q.id} className="mt-1 min-h-24 w-full rounded-md border border-slate-300 p-2" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} />
            )}
            {q.type === "text" && (
              <input id={q.id} className="mt-1 w-full rounded-md border border-slate-300 p-2" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} />
            )}
            {q.type === "singleSelect" && (
              <select id={q.id} className="mt-1 w-full rounded-md border border-slate-300 p-2" value={answers[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)}>
                <option value="">Select one</option>
                {q.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            )}
          </div>
        );
      })}
    </div>
  </section>
);
