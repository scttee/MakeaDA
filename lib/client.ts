"use client";

export const logEvent = (name: string, payload: Record<string, string> = {}) => {
  const event = { name, payload, ts: Date.now() };
  console.log("analytics", event);
  const raw = localStorage.getItem("ppg_events");
  const items = raw ? JSON.parse(raw) : [];
  items.push(event);
  localStorage.setItem("ppg_events", JSON.stringify(items));
};

export const saveAnswers = (journey: string, answers: Record<string, string>) => localStorage.setItem(`ppg_answers_${journey}`, JSON.stringify(answers));
export const loadAnswers = (journey: string) => {
  const raw = localStorage.getItem(`ppg_answers_${journey}`);
  return raw ? JSON.parse(raw) : {};
};
