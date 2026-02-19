import { Suspense } from "react";
import JourneyQuestionsClient from "@/components/JourneyQuestionsClient";
import { journeys } from "@/data/content";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export default function QuestionsPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-600">Loading questions…</div>}>
      <JourneyQuestionsClient slug={params.slug} />
    </Suspense>
  );
}
