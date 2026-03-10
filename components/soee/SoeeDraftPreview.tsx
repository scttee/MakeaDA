import { SoeeDraft } from "@/lib/soee/types";

export const SoeeDraftPreview = ({ draft }: { draft: SoeeDraft }) => (
  <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold">Draft preview</h2>
    <p className="mt-1 text-sm text-slate-700">{draft.summary}</p>
    <div className="mt-4 space-y-4">
      {draft.sections.map((s) => (
        <article key={s.id}>
          <h3 className="font-semibold">{s.title}</h3>
          <pre className="whitespace-pre-wrap text-sm text-slate-700">{s.content}</pre>
        </article>
      ))}
    </div>
  </section>
);
