"use client";

import { SoeeDraft } from "@/lib/soee/types";
import { logEvent } from "@/lib/client";

const draftToMarkdown = (draft: SoeeDraft) => {
  const sections = draft.sections.map((s) => `## ${s.title}\n\n${s.content}`).join("\n\n");
  return `# ${draft.title}\n\n${draft.summary}\n\n${sections}`;
};

export const ExportActions = ({ draft, journeySlug }: { draft: SoeeDraft; journeySlug: string }) => {
  const copy = async () => {
    await navigator.clipboard.writeText(draftToMarkdown(draft));
    logEvent("soee_exported", { type: "copy", journeySlug });
  };

  const download = () => {
    const blob = new Blob([draftToMarkdown(draft)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `soee-${journeySlug}.md`;
    a.click();
    URL.revokeObjectURL(url);
    logEvent("soee_exported", { type: "markdown", journeySlug });
  };

  const print = () => {
    window.print();
    logEvent("soee_printed", { journeySlug });
  };

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button onClick={copy} className="rounded-token border border-slate-300 bg-white px-4 py-2">Copy draft</button>
      <button onClick={download} className="rounded-token border border-slate-300 bg-white px-4 py-2">Download markdown</button>
      <button onClick={print} className="rounded-token border border-slate-300 bg-white px-4 py-2">Print-friendly page</button>
    </div>
  );
};
