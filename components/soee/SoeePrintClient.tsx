"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { SoeeDraft } from "@/lib/soee/types";
import { SOEE_BANNER } from "@/lib/soee/config";
import { logEvent } from "@/lib/client";

export default function SoeePrintClient({ journeySlug }: { journeySlug: string }) {
  const [draft, setDraft] = useState<SoeeDraft | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(`ppg_soee_draft_${journeySlug}`);
    setDraft(raw ? JSON.parse(raw) : null);
  }, [journeySlug]);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Print-friendly SoEE draft</h1>
      <p className="mt-2 rounded-token border border-amber-300 bg-amber-50 p-3 text-sm">{SOEE_BANNER}</p>
      {!draft ? <p className="mt-4">No draft found. Return to SoEE builder and generate a draft first.</p> : (
        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-semibold">{draft.title}</h2>
          {draft.sections.map((s) => (
            <section key={s.id}>
              <h3 className="font-semibold">{s.title}</h3>
              <pre className="whitespace-pre-wrap">{s.content}</pre>
            </section>
          ))}
          <button onClick={() => { window.print(); logEvent("soee_printed", { journeySlug }); }} className="rounded-token border border-slate-300 px-4 py-2">Print</button>
        </div>
      )}
    </Layout>
  );
}
