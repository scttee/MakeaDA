import Link from "next/link";
import { Journey } from "@/lib/types";
import { IsoIcon } from "@/components/Illustrations";

export const JourneyCard = ({ journey }: { journey: Journey }) => (
  <Link href={`/journey/${journey.slug}`} className="block rounded-token border p-5 focus:outline focus:outline-2 focus:outline-primary hover:border-primary">
    <IsoIcon label={journey.title} accent="secondary" />
    <h3 className="mt-3 text-lg font-semibold">{journey.title}</h3>
    <p className="text-sm">{journey.description}</p>
  </Link>
);
