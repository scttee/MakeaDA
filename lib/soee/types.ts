export type SoeeQuestion = {
  id: string;
  label: string;
  type: "text" | "textarea" | "singleSelect";
  helpText?: string;
  options?: string[];
  required: boolean;
  when?: { field: string; equals?: string; anyOf?: string[] };
};

export type SoeeSection = {
  id: string;
  title: string;
  content: string;
};

export type SupportingDoc = {
  id: string;
  title: string;
  reason: string;
  category: "always" | "likely" | "sometimes";
  officialLink?: string;
};

export type CautionFlag = {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning";
};

export type SoeeDraft = {
  title: string;
  summary: string;
  sections: SoeeSection[];
  cautionFlags: CautionFlag[];
  supportingDocs: SupportingDoc[];
};

export type SoeeAnswers = Record<string, string | undefined>;
