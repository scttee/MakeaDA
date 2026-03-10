import { Answers, Condition, Output, Rule } from "@/lib/types";
import { OFFICIAL_LINKS, SAFETY_NOTE } from "@/lib/constants";

const addUnique = <T>(arr: T[], item: T) => {
  if (!arr.includes(item)) arr.push(item);
};

const evalCondition = (condition: Condition, answers: Answers): boolean => {
  if (condition.op === "equals") return String(answers[condition.field] ?? "") === condition.value;
  if (condition.op === "includes") return Array.isArray(answers[condition.field])
    ? (answers[condition.field] as string[]).includes(condition.value)
    : String(answers[condition.field] ?? "") === condition.value;
  if (condition.op === "notSure") return String(answers[condition.field] ?? "").toLowerCase().includes("not sure");
  if (condition.op === "anyOf") return condition.conditions.some((c) => evalCondition(c, answers));
  return condition.conditions.every((c) => evalCondition(c, answers));
};

const baseOutput = (): Output => ({
  confidence: "med",
  likelyPathways: ["DA"],
  checklistItems: [
    { text: "Statement of Environmental Effects (SoEE)", group: "always" },
    { text: "Owner's consent", group: "always" },
    { text: "Cost estimate report", group: "always" },
    { text: "Site plan + existing and proposed drawings", group: "likely" }
  ],
  contactOptions: [{ label: "Talk to a duty planner", href: OFFICIAL_LINKS.cityDutyPlanner }, { label: "City contact", href: OFFICIAL_LINKS.cityContact }],
  nextSteps: ["Review your checklist", "Prepare documents", "Confirm with official guidance before lodging"],
  disclaimers: [SAFETY_NOTE],
  deepLinks: [
    OFFICIAL_LINKS.nswDaGuidance,
    OFFICIAL_LINKS.cityPrepareDa,
    OFFICIAL_LINKS.cityDocumentRequirements,
    OFFICIAL_LINKS.cityLodgeDa,
    OFFICIAL_LINKS.cityDutyPlanner,
    OFFICIAL_LINKS.cityContact,
    OFFICIAL_LINKS.cityEplanning
  ],
  why: []
});

const rules: Rule[] = [
  {
    id: "global-talk-planner",
    appliesToJourneys: ["*"],
    conditions: {
      op: "anyOf",
      conditions: [
        { op: "equals", field: "confidence", value: "I'm not sure" },
        { op: "notSure", field: "heritage" },
        { op: "equals", field: "changeOfUse", value: "Yes" },
        { op: "notSure", field: "changeOfUse" },
        { op: "equals", field: "publicDomainImpact", value: "Footpath/kerb" },
        { op: "equals", field: "publicDomainImpact", value: "Road/parking lane" },
        {
          op: "allOf",
          conditions: [
            { op: "equals", field: "propertyType", value: "Apartment" },
            { op: "anyOf", conditions: [{ op: "equals", field: "commonProperty", value: "Yes" }, { op: "notSure", field: "commonProperty" }] }
          ]
        }
      ]
    },
    apply: ({ output }) => {
      addUnique(output.likelyPathways, "talkToPlanner");
      output.confidence = "low";
      output.why.push("Some answers include uncertainty or possible higher-risk factors.");
    }
  },
  {
    id: "basix-may-apply",
    appliesToJourneys: ["*"],
    conditions: {
      op: "anyOf",
      conditions: [
        { op: "equals", field: "estimatedCost", value: "50k–250k" },
        { op: "equals", field: "estimatedCost", value: "250k+" },
        { op: "equals", field: "journeySlug", value: "build-new" },
        { op: "equals", field: "journeySlug", value: "granny-flat" },
        { op: "equals", field: "journeySlug", value: "extension" }
      ]
    },
    apply: ({ output }) => {
      output.checklistItems.push({ text: "BASIX may apply. Check requirements.", group: "sometimes", reason: "Residential scope or project cost may trigger BASIX." });
    }
  },
  {
    id: "modify-approved",
    appliesToJourneys: ["modify-approved"],
    conditions: { op: "equals", field: "journeySlug", value: "modify-approved" },
    apply: ({ output }) => {
      output.likelyPathways = ["modification"];
      output.checklistItems.push({ text: "Annotated plans showing what changed", group: "always" });
      output.checklistItems.push({ text: "Updated SoEE explaining the change", group: "always" });
      output.why.push("You selected a change to an approved DA (s4.55 pathway).", "Modification pathway focuses on describing the approved vs proposed changes.");
    }
  },
  {
    id: "start-building",
    appliesToJourneys: ["start-building"],
    conditions: { op: "equals", field: "journeySlug", value: "start-building" },
    apply: ({ answers, output }) => {
      output.likelyPathways = [String(answers.hasDA) === "Yes" ? "constructionCertificate" : "buildingCertificate"];
      output.contactOptions.push({ label: "Talk to your certifier" });
      output.why.push("Starting building work usually requires certification steps before construction.");
    }
  },
  {
    id: "outdoor-dining-public-domain",
    appliesToJourneys: ["outdoor-dining", "*"],
    conditions: {
      op: "anyOf",
      conditions: [
        { op: "equals", field: "journeySlug", value: "outdoor-dining" },
        { op: "equals", field: "publicDomainImpact", value: "Footpath/kerb" },
        { op: "equals", field: "publicDomainImpact", value: "Road/parking lane" }
      ]
    },
    apply: ({ output }) => {
      output.checklistItems.push({ text: "Accessibility clearance and pedestrian path considerations", group: "sometimes", reason: "Public domain use needs safe and clear movement paths." });
      output.contactOptions.push({ label: "City contact for public domain checks", href: OFFICIAL_LINKS.cityContact });
    }
  },
  {
    id: "signage-illumination",
    appliesToJourneys: ["signage"],
    conditions: {
      op: "allOf",
      conditions: [
        { op: "equals", field: "journeySlug", value: "signage" },
        { op: "anyOf", conditions: [{ op: "equals", field: "illuminated", value: "Yes" }, { op: "notSure", field: "illuminated" }] }
      ]
    },
    apply: ({ answers, output }) => {
      output.checklistItems.push({ text: "Electrical and illumination details", group: "likely" });
      if (["Yes", "Not sure"].includes(String(answers.heritage ?? ""))) {
        output.checklistItems.push({ text: "Heritage and streetscape considerations", group: "sometimes", reason: "Heritage context can affect sign outcomes." });
      }
    }
  },
  {
    id: "heritage",
    appliesToJourneys: ["*", "heritage-works"],
    conditions: { op: "anyOf", conditions: [{ op: "equals", field: "heritage", value: "Yes" }, { op: "notSure", field: "heritage" }, { op: "equals", field: "journeySlug", value: "heritage-works" }] },
    apply: ({ output }) => {
      output.checklistItems.push({ text: "Heritage impact information", group: "sometimes", reason: "Heritage context may require extra supporting information." });
      output.nextSteps.push("Confirm heritage status using official mapping/tools and duty planner advice.");
    }
  },
  {
    id: "demolition-asbestos",
    appliesToJourneys: ["demolition"],
    conditions: { op: "allOf", conditions: [{ op: "equals", field: "journeySlug", value: "demolition" }, { op: "anyOf", conditions: [{ op: "equals", field: "asbestos", value: "Yes" }, { op: "notSure", field: "asbestos" }] }] },
    apply: ({ output }) => {
      output.disclaimers.push("Asbestos considerations and safe handling are important. Seek licensed professional advice.");
    }
  }
];

export const runRules = (journeySlug: string, answers: Answers): Output => {
  const output = baseOutput();
  const ctx = { journeySlug, answers: { ...answers, journeySlug }, output };
  rules.forEach((rule) => {
    const inScope = rule.appliesToJourneys.includes("*") || rule.appliesToJourneys.includes(journeySlug);
    if (inScope && evalCondition(rule.conditions, ctx.answers)) rule.apply(ctx);
  });
  if (journeySlug === "lookup") {
    output.likelyPathways = ["lookup"];
    output.checklistItems = [];
    output.why = ["You selected lookup mode to search existing applications."];
  }
  return output;
};
