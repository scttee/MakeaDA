import { journeys } from "@/data/content";
import { Layout } from "@/components/Layout";
import { JourneyCard } from "@/components/Cards";

export const CategoryPage = ({ categoryId, title }: { categoryId: string; title: string }) => (
  <Layout>
    <h1 className="text-3xl font-semibold">{title}</h1>
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {journeys.filter((j) => j.categoryId === categoryId).map((j) => <JourneyCard key={j.id} journey={j} />)}
    </div>
  </Layout>
);
