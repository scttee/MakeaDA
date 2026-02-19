"use client";

import { useMemo } from "react";
import { Layout } from "@/components/Layout";

type AnalyticsEvent = {
  name: string;
  payload?: Record<string, string>;
  ts?: number;
};

const readEvents = (): AnalyticsEvent[] => {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem("ppg_events");
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
};

const groupCount = (events: AnalyticsEvent[], eventName: string, field: string): [string, number][] => {
  const map: Record<string, number> = {};

  events
    .filter((event) => event.name === eventName)
    .forEach((event) => {
      const key = event.payload?.[field] ?? "unknown";
      map[key] = (map[key] ?? 0) + 1;
    });

  return Object.entries(map).sort((a, b) => b[1] - a[1]);
};

export default function AdminAnalytics() {
  const events = readEvents();

  const topJourneys = useMemo(() => groupCount(events, "result_viewed", "journey"), [events]);
  const topNotSure: Record<string, number> = useMemo(
    () =>
      events
        .filter((event) => event.name === "question_answered" && String(event.payload?.value).includes("Not sure"))
        .reduce<Record<string, number>>((acc, event) => {
          const questionId = event.payload?.questionId ?? "unknown";
          acc[questionId] = (acc[questionId] ?? 0) + 1;
          return acc;
        }, {}),
    [events],
  );
  const topPathways = useMemo(() => groupCount(events, "result_viewed", "pathways"), [events]);
  const dropoff = useMemo(() => groupCount(events, "question_answered", "questionId"), [events]);

  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Prototype analytics</h1>
      <section className="mt-5">
        <h2 className="font-semibold">Top journeys</h2>
        <ul>{topJourneys.map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
      </section>
      <section className="mt-5">
        <h2 className="font-semibold">Top "Not sure" questions</h2>
        <ul>{Object.entries(topNotSure).map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
      </section>
      <section className="mt-5">
        <h2 className="font-semibold">Top resulting pathways</h2>
        <ul>{topPathways.map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
      </section>
      <section className="mt-5">
        <h2 className="font-semibold">Drop-off points by question id</h2>
        <ul>{dropoff.map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
      </section>
    </Layout>
  );
}
