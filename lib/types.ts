export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

export type ExampleTile = { id: string; title: string; description: string };

export type Journey = {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  description: string;
  illustrationSvgComponentName: string;
  exampleTiles: ExampleTile[];
};

export type QuestionType = "singleSelect" | "multiSelect" | "boolean" | "numberBracket" | "text";

export type Question = {
  id: string;
  text: string;
  helpText?: string;
  type: QuestionType;
  options?: string[];
  tags?: string[];
  when?: { field: string; equals?: string; anyOf?: string[] };
};

export type Condition =
  | { op: "equals"; field: string; value: string }
  | { op: "includes"; field: string; value: string }
  | { op: "notSure"; field: string }
  | { op: "anyOf"; conditions: Condition[] }
  | { op: "allOf"; conditions: Condition[] };

export type Pathway =
  | "DA"
  | "possibleExemptOrComplying"
  | "modification"
  | "buildingCertificate"
  | "constructionCertificate"
  | "talkToPlanner"
  | "lookup";

export type ChecklistItem = { text: string; group: "always" | "likely" | "sometimes"; reason?: string };

export type Output = {
  confidence: "high" | "med" | "low";
  likelyPathways: Pathway[];
  checklistItems: ChecklistItem[];
  contactOptions: { label: string; href?: string }[];
  nextSteps: string[];
  disclaimers: string[];
  deepLinks: string[];
  why: string[];
};

export type Rule = {
  id: string;
  appliesToJourneys: string[];
  conditions: Condition;
  apply: (ctx: RuleContext) => void;
};

export type Answers = Record<string, string | string[] | undefined>;

export type RuleContext = {
  journeySlug: string;
  answers: Answers;
  output: Output;
};
