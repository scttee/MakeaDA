import JourneyQuestionsClient from "@/components/JourneyQuestionsClient";
import { journeys } from "@/data/content";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export default function QuestionsPage({ params }: { params: { slug: string } }) {
  return <JourneyQuestionsClient slug={params.slug} />;
}
