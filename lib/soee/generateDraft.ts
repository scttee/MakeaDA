import { SOEE_OFFICIAL_LINKS } from "@/lib/soee/config";
import { SoeeAnswers, SoeeDraft, CautionFlag } from "@/lib/soee/types";
import { generateChecklist } from "@/lib/soee/generateChecklist";

const valueOrPlaceholder = (value: string | undefined, placeholder: string) => value?.trim() ? value : placeholder;

const toConfirm = (id: string, label: string, value: string | undefined): CautionFlag[] => {
  if (String(value) !== "notSure") return [];
  return [{
    id: `confirm-${id}`,
    title: `Confirm ${label} before lodgement`,
    message: "You selected Not sure. Confirm this with official requirements and, if needed, the duty planner.",
    severity: "warning"
  }];
};

export const generateDraft = (journeySlug: string, answers: SoeeAnswers): SoeeDraft => {
  const docs = generateChecklist(journeySlug, answers);

  const cautionFlags: CautionFlag[] = [
    ...toConfirm("externalChanges", "external changes", answers.externalChanges),
    ...toConfirm("heritageStatus", "heritage status", answers.heritageStatus),
    ...toConfirm("estimatedCost", "estimated cost", answers.estimatedCost),
    ...Object.entries(answers)
      .filter(([, v]) => v === "notSure")
      .map(([k]) => ({
        id: `unsure-${k}`,
        title: `Clarify ${k}`,
        message: "This answer is marked not sure. Confirm this detail before lodgement.",
        severity: "info" as const
      }))
  ].filter((f, idx, arr) => arr.findIndex((x) => x.id === f.id) === idx);

  const sections = [
    {
      id: "proposal-summary",
      title: "1. Proposal summary",
      content: `The proposal relates to ${journeySlug.replace(/-/g, " ")} at ${valueOrPlaceholder(answers.siteAddress, "[Add site address here]")}.\n${valueOrPlaceholder(answers.proposalSummary, "[Add proposal summary here]")}.`
    },
    {
      id: "site-context",
      title: "2. Site and surrounding context",
      content: `Site context: ${valueOrPlaceholder(answers.siteAddress, "[Add site context here]")}.\nHeritage status: ${valueOrPlaceholder(answers.heritageStatus, "[Confirm heritage status]")}.`
    },
    {
      id: "use",
      title: "3. Existing and proposed use",
      content: `Existing use: ${valueOrPlaceholder(answers.existingUse, "[Add existing use]")}.\nProposed use: ${valueOrPlaceholder(answers.proposedUse, "[Add proposed use]")}.`
    },
    {
      id: "planning-considerations",
      title: "4. Relevant planning considerations",
      content: `Likely considerations include local controls, site context and proposal scale.\nConfirm details against official City and NSW guidance: ${SOEE_OFFICIAL_LINKS.cityPrepareDa} and ${SOEE_OFFICIAL_LINKS.nswDaGuidance}.`
    },
    {
      id: "impacts",
      title: "5. Environmental and amenity impacts",
      content: `External changes: ${valueOrPlaceholder(answers.externalChanges, "[Confirm external changes]")}.\nPotential impacts (amenity/environment): ${valueOrPlaceholder(answers.worksDescription, "[Add impact description]")}.`
    },
    {
      id: "measures",
      title: "6. Measures to minimise impacts",
      content: `Proposed mitigation measures: ${valueOrPlaceholder(answers.worksDescription, "[Add mitigation measures]")}.\nIf any details are not known, confirm with specialist advice before lodgement.`
    },
    {
      id: "docs-submitted",
      title: "7. Supporting documents submitted",
      content: docs.map((d) => `- ${d.title} (${d.category})`).join("\n")
    },
    {
      id: "matters-confirm",
      title: "8. Matters to confirm or seek advice on",
      content: cautionFlags.length
        ? cautionFlags.map((f) => `- ${f.title}: ${f.message}`).join("\n")
        : "- Confirm all final requirements using official City document lists and NSW Planning Portal guidance."
    }
  ];

  return {
    title: `Draft Statement of Environmental Effects (${journeySlug})`,
    summary: "This is a first-pass draft based on your answers. It may need refinement before lodgement.",
    sections,
    cautionFlags,
    supportingDocs: docs
  };
};
