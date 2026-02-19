import { OFFICIAL_LINKS, SAFETY_NOTE } from "@/lib/constants";

const LINK_LABELS: Record<keyof typeof OFFICIAL_LINKS, string> = {
  nswDaGuidance: "NSW Planning Portal: Online DA guidance",
  cityPrepareDa: "City of Sydney: How to prepare your development application",
  cityDocumentRequirements: "City of Sydney: Check document requirements",
  cityLodgeDa: "City of Sydney: Lodge a development application",
  cityDutyPlanner: "City of Sydney: Get advice from the City (duty planner)",
  cityContact: "City of Sydney: Contact us",
  cityEplanning: "City of Sydney: ePlanning search"
};

export const ConfirmDetails = () => (
  <section className="rounded-token border border-slate-200 bg-slate-50 p-6" aria-label="Confirm details section">
    <h2 className="text-xl font-semibold">Confirm details</h2>
    <p className="mt-2 text-sm text-slate-700">{SAFETY_NOTE}</p>
    <ul className="mt-4 space-y-2 text-sm">
      {Object.entries(OFFICIAL_LINKS).map(([k, v]) => (
        <li key={k}>
          <a className="inline-flex items-start gap-2 underline decoration-slate-400 underline-offset-2 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={v} target="_blank" rel="noreferrer">
            <span aria-hidden="true">↗</span>
            <span>{LINK_LABELS[k as keyof typeof OFFICIAL_LINKS]}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
);
