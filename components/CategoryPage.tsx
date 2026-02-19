import { journeys } from "@/data/content";
import { Layout } from "@/components/Layout";
import { JourneyCard } from "@/components/Cards";

const needsByCategory: Record<string, string[]> = {
  home: ["I want to know what documents to prepare", "I am unsure if my works are minor or larger", "I need to understand likely neighbour or heritage impacts"],
  business: ["I need clarity on change-of-use and trading impacts", "I want to understand signage/outdoor dining expectations", "I need a practical list before speaking to the City"],
  after: ["I need to change approved plans", "I need to understand certification before building", "I want to check existing applications quickly"]
};

export const CategoryPage = ({ categoryId, title }: { categoryId: string; title: string }) => (
  <Layout>
    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
    <p className="mt-2 text-slate-700">Choose the journey closest to your situation. You can select “Not sure” later and still receive guidance.</p>

    <section className="mt-5 rounded-token border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-lg font-semibold">Common customer needs in this category</h2>
      <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
        {(needsByCategory[categoryId] ?? []).map((need) => <li key={need}>{need}</li>)}
      </ul>
    </section>

    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {journeys.filter((j) => j.categoryId === categoryId).map((j) => <JourneyCard key={j.id} journey={j} />)}
    </div>
  </Layout>
);
