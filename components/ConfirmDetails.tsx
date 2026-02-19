import { OFFICIAL_LINKS, SAFETY_NOTE } from "@/lib/constants";

export const ConfirmDetails = () => (
  <section className="rounded-token border p-6" aria-label="Confirm details section">
    <h2 className="text-xl font-semibold">Confirm details</h2>
    <p className="mt-2 text-sm">{SAFETY_NOTE}</p>
    <ul className="mt-4 list-disc pl-6 space-y-1 text-sm">
      {Object.entries(OFFICIAL_LINKS).map(([k, v]) => (
        <li key={k}><a className="underline focus:outline focus:outline-2 focus:outline-primary" href={v} target="_blank">{v}</a></li>
      ))}
    </ul>
  </section>
);
