"use client";
import { useMemo } from "react";
import { Layout } from "@/components/Layout";

const groupCount = (events: any[], name: string, field: string) => {
  const map: Record<string, number> = {};
  events.filter((e) => e.name === name).forEach((e) => {
    const key = e.payload?.[field] ?? "unknown";
    map[key] = (map[key] ?? 0) + 1;
  });
  return Object.entries(map).sort((a,b)=>b[1]-a[1]);
};

export default function AdminAnalytics() {
  const events = typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("ppg_events") || "[]");
  const topJourneys = useMemo(()=>groupCount(events, "result_viewed", "journey"), [events]);
  const topNotSure = useMemo(()=>events.filter((e:any)=>e.name==="question_answered" && String(e.payload?.value).includes("Not sure")).reduce((acc:Record<string,number>, e:any)=>{const k=e.payload.questionId;acc[k]=(acc[k]||0)+1;return acc;},{}), [events]);
  const topPathways = useMemo(()=>groupCount(events, "result_viewed", "pathways"), [events]);
  const dropoff = useMemo(()=>groupCount(events, "question_answered", "questionId"), [events]);

  return <Layout>
    <h1 className="text-3xl font-semibold">Prototype analytics</h1>
    <section className="mt-5"><h2 className="font-semibold">Top journeys</h2><ul>{topJourneys.map(([k,v])=><li key={k}>{k}: {v}</li>)}</ul></section>
    <section className="mt-5"><h2 className="font-semibold">Top "Not sure" questions</h2><ul>{Object.entries(topNotSure).map(([k,v])=><li key={k}>{k}: {v}</li>)}</ul></section>
    <section className="mt-5"><h2 className="font-semibold">Top resulting pathways</h2><ul>{topPathways.map(([k,v])=><li key={k}>{k}: {v}</li>)}</ul></section>
    <section className="mt-5"><h2 className="font-semibold">Drop-off points by question id</h2><ul>{dropoff.map(([k,v])=><li key={k}>{k}: {v}</li>)}</ul></section>
  </Layout>;
}
