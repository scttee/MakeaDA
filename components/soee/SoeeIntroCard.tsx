import { SOEE_BANNER, SOEE_OFFICIAL_LINKS } from "@/lib/soee/config";

export const SoeeIntroCard = ({ journeySlug }: { journeySlug: string }) => (
  <section className="rounded-token border border-slate-200 bg-white p-6 shadow-sm">
    <h1 className="text-3xl font-semibold tracking-tight">Statement of Environmental Effects Builder</h1>
    <p className="mt-2 text-slate-700">Journey: <strong>{journeySlug}</strong></p>
    <p className="mt-3 rounded-token border border-amber-300 bg-amber-50 p-3 text-sm text-slate-800">{SOEE_BANNER}</p>
    <p className="mt-3 text-sm text-slate-600">Confirm requirements with official guidance: <a href={SOEE_OFFICIAL_LINKS.cityDocumentRequirements} target="_blank" rel="noreferrer" className="underline">City document requirements</a>.</p>
  </section>
);
