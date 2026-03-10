import { CautionFlag } from "@/lib/soee/types";

export const CautionFlagsPanel = ({ flags }: { flags: CautionFlag[] }) => {
  if (!flags.length) return null;
  return (
    <section className="mt-5 rounded-token border border-amber-300 bg-amber-50 p-6">
      <h2 className="text-xl font-semibold">Matters to confirm</h2>
      <ul className="mt-2 list-disc pl-5 text-sm text-slate-800">
        {flags.map((f) => <li key={f.id}><strong>{f.title}:</strong> {f.message}</li>)}
      </ul>
    </section>
  );
};
