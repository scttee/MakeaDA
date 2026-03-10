import Link from "next/link";
import { Journey } from "@/lib/types";
import { JourneyIllustration } from "@/components/Illustrations";

export const JourneyCard = ({ journey }: { journey: Journey }) => (
  <Link
    href={`/journey/${journey.slug}`}
    className="group block rounded-token border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    aria-label={`Open journey: ${journey.title}`}
  >
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <JourneyIllustration label={journey.title} name={journey.illustrationSvgComponentName} accent="secondary" />
    </div>
    <h3 className="mt-3 text-lg font-semibold text-slate-900">{journey.title}</h3>
    <p className="text-sm text-slate-700">{journey.description}</p>
    <p className="mt-3 text-xs font-medium text-secondary">Open journey →</p>
  </Link>
);
