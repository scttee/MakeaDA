import { journeys } from "@/data/content";
import { Layout } from "@/components/Layout";
import { JourneyCard } from "@/components/Cards";

export const CategoryPage = ({ categoryId, title }: { categoryId: string; title: string }) => (
  <Layout>
    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
    <p className="mt-2 text-slate-700">Choose a journey closest to your situation. If you are not sure, choose the closest option and select “Not sure” in questions.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {journeys.filter((j) => j.categoryId === categoryId).map((j) => <JourneyCard key={j.id} journey={j} />)}
    </div>
  </Layout>
);
