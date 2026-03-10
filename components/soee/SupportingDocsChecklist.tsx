import { SupportingDoc } from "@/lib/soee/types";

export const SupportingDocsChecklist = ({ docs }: { docs: SupportingDoc[] }) => (
  <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold">Likely supporting documents</h2>
    {(["always", "likely", "sometimes"] as const).map((group) => (
      <div key={group} className="mt-3">
        <h3 className="font-medium capitalize">{group}</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          {docs.filter((d) => d.category === group).map((d) => (
            <li key={d.id}>{d.title} — {d.reason}</li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);
