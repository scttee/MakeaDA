import { Category, Journey, Question } from "@/lib/types";

export const categories: Category[] = [
  { id: "home", slug: "home-property", title: "Home and property", description: "Works to houses, apartments and residential land." },
  { id: "business", slug: "business-premises", title: "Business and premises", description: "Fitouts, signage, outdoor dining and operating changes." },
  { id: "after", slug: "after-approval", title: "After approval", description: "Changes after consent, start of works and lookup tasks." }
];

const mkTiles = (...labels: string[]) => labels.map((label, index) => ({
  id: String(index + 1),
  title: label,
  description: `Common scenario: ${label.toLowerCase()}.`
}));

export const journeys: Journey[] = [
  { id: "1", categoryId: "home", slug: "build-new", title: "Build something new", description: "House, multi dwelling or mixed-use new build.", illustrationSvgComponentName: "IsoBuild", exampleTiles: mkTiles("New house", "Multi dwelling", "Mixed-use building") },
  { id: "2", categoryId: "home", slug: "renovate-inside", title: "Renovate inside", description: "Kitchen, bathroom or other internal works.", illustrationSvgComponentName: "IsoRenovate", exampleTiles: mkTiles("Kitchen upgrade", "Bathroom renovation", "Internal layout change") },
  { id: "3", categoryId: "home", slug: "extension", title: "Extension or add a level", description: "Expand your existing building footprint.", illustrationSvgComponentName: "IsoExtension", exampleTiles: mkTiles("Rear extension", "Side extension", "Add a second level") },
  { id: "4", categoryId: "home", slug: "granny-flat", title: "Granny flat / secondary dwelling", description: "Create a separate secondary residence.", illustrationSvgComponentName: "IsoGranny", exampleTiles: mkTiles("Detached granny flat", "Attached secondary dwelling", "Garage conversion") },
  { id: "5", categoryId: "home", slug: "deck-pergola-carport", title: "Deck, pergola, carport or crossover", description: "Outdoor structures and vehicle access works.", illustrationSvgComponentName: "IsoDeck", exampleTiles: mkTiles("New deck", "Pergola cover", "Carport and driveway crossover") },
  { id: "6", categoryId: "home", slug: "pool-spa", title: "Install a pool or spa", description: "Swimming pool and associated fencing or paving.", illustrationSvgComponentName: "IsoPool", exampleTiles: mkTiles("In-ground pool", "Plunge pool", "Spa and pool fence") },
  { id: "7", categoryId: "home", slug: "demolition", title: "Demolition", description: "Partial or full demolition work.", illustrationSvgComponentName: "IsoDemo", exampleTiles: mkTiles("Partial demolition", "Full knockdown", "Outbuilding removal") },
  { id: "8", categoryId: "home", slug: "change-exterior", title: "Change the exterior", description: "Windows, facade, awnings or balconies.", illustrationSvgComponentName: "IsoExterior", exampleTiles: mkTiles("New windows", "Awning replacement", "Balcony alteration") },
  { id: "9", categoryId: "home", slug: "heritage-works", title: "Heritage works", description: "Works in heritage buildings or areas.", illustrationSvgComponentName: "IsoHeritage", exampleTiles: mkTiles("Repair heritage facade", "Roof restoration", "Internal heritage fabric changes") },
  { id: "10", categoryId: "business", slug: "fitout", title: "Business fitout", description: "Fit out a shop, cafe, bar or restaurant.", illustrationSvgComponentName: "IsoFitout", exampleTiles: mkTiles("Cafe fitout", "Restaurant kitchen", "Retail interior refresh") },
  { id: "11", categoryId: "business", slug: "change-use", title: "Change of use", description: "Change what a premises is used for.", illustrationSvgComponentName: "IsoUse", exampleTiles: mkTiles("Office to cafe", "Retail to medical", "Warehouse to studio") },
  { id: "12", categoryId: "business", slug: "outdoor-dining", title: "Outdoor dining / footpath use", description: "Tables, barriers, heaters and hours outdoors.", illustrationSvgComponentName: "IsoOutdoor", exampleTiles: mkTiles("Footpath tables", "Roadside lane dining", "Heaters and barriers") },
  { id: "13", categoryId: "business", slug: "signage", title: "Signage", description: "New, larger, illuminated or fascia signage.", illustrationSvgComponentName: "IsoSign", exampleTiles: mkTiles("Fascia sign", "Projecting sign", "Illuminated signage") },
  { id: "14", categoryId: "business", slug: "trading-hours-pom", title: "Trading hours or Plan of Management", description: "Change operating hours or update POM.", illustrationSvgComponentName: "IsoHours", exampleTiles: mkTiles("Later closing time", "Update Plan of Management", "Patron management changes") },
  { id: "15", categoryId: "after", slug: "modify-approved", title: "Change an approved DA (s4.55)", description: "Modify consented plans or conditions.", illustrationSvgComponentName: "IsoModify", exampleTiles: mkTiles("Layout tweak", "Facade revision", "Condition wording change") },
  { id: "16", categoryId: "after", slug: "start-building", title: "Start building", description: "Understand construction certificate steps.", illustrationSvgComponentName: "IsoBuildStart", exampleTiles: mkTiles("Need a construction certificate", "Choosing a certifier", "Pre-construction checks") },
  { id: "17", categoryId: "after", slug: "lookup", title: "Lookup exhibition or approvals", description: "Search for applications and statuses.", illustrationSvgComponentName: "IsoLookup", exampleTiles: mkTiles("Search by address", "Search DA number", "Track exhibition") },
  { id: "18", categoryId: "after", slug: "talk-to-someone", title: "Talk to someone first", description: "Get early advice before preparing plans.", illustrationSvgComponentName: "IsoTalk", exampleTiles: mkTiles("Not sure where to start", "Need duty planner advice", "Need a simple starter checklist") },
  { id: "19", categoryId: "home", slug: "strata-apartment", title: "Apartment or strata works", description: "Common property and approval pathways.", illustrationSvgComponentName: "IsoStrata", exampleTiles: mkTiles("Bathroom works", "Balcony changes", "Common property impacts") }
];

export const baseQuestions: Question[] = [
  { id: "propertyType", text: "What type of property is this?", type: "singleSelect", options: ["House", "Apartment", "Business premises", "Mixed-use", "Not sure"] },
  { id: "externalChanges", text: "Are there external changes?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
  { id: "changeOfUse", text: "Is there a change of use?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
  { id: "heritage", text: "Is it a heritage property or in a heritage area?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
  { id: "scale", text: "Project scale", helpText: "Small, medium or large based on overall impact.", type: "singleSelect", options: ["Small", "Medium", "Large", "Not sure"] },
  { id: "estimatedCost", text: "Estimated cost", type: "singleSelect", options: ["Under 50k", "50k–250k", "250k+", "Not sure"] },
  { id: "publicDomainImpact", text: "Any impact to public domain?", type: "singleSelect", options: ["Footpath/kerb", "Road/parking lane", "None", "Not sure"] },
  { id: "neighbourImpacts", text: "Possible neighbour impacts", type: "singleSelect", options: ["Overlooking", "Shadow", "Noise", "None", "Not sure"] },
  { id: "conceptReady", text: "How ready are your plans?", type: "singleSelect", options: ["I have plans", "I have sketches", "I have nothing yet"] },
  { id: "confidence", text: "How confident are you about next steps?", type: "singleSelect", options: ["I'm confident", "I'm not sure"] }
];

export const journeyExtraQuestions: Record<string, Question[]> = {
  signage: [
    { id: "illuminated", text: "Is the signage illuminated?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
    { id: "signType", text: "Sign type", type: "singleSelect", options: ["Freestanding", "Building-mounted", "Not sure"] },
    { id: "roadSafety", text: "Could it affect road safety visibility?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  "outdoor-dining": [
    { id: "footpathWidthKnown", text: "Do you know the footpath width?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "tradingHoursChange", text: "Are trading hours changing?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "heaters", text: "Will you use heaters?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "barriers", text: "Will you use barriers?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "accessibilityClearance", text: "Are you sure about accessibility clearance?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  "trading-hours-pom": [
    { id: "alcohol", text: "Alcohol service involved?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
    { id: "liveMusic", text: "Live music?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "patronBand", text: "Patron numbers", type: "singleSelect", options: ["Low", "Medium", "High", "Not sure"] },
    { id: "complaintsRisk", text: "Any complaints risk?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  "renovate-inside": [
    { id: "structuralChanges", text: "Any structural changes?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
    { id: "waterproofing", text: "Any waterproofing works?", type: "singleSelect", options: ["Yes", "No", "Not sure"] },
    { id: "commonProperty", text: "Does it affect apartment common property?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  demolition: [
    { id: "demolitionType", text: "Demolition type", type: "singleSelect", options: ["Partial", "Full"] },
    { id: "asbestos", text: "Is asbestos suspected?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  "start-building": [
    { id: "hasDA", text: "Do you already have DA approval?", type: "singleSelect", options: ["Yes", "No"] },
    { id: "hasCC", text: "Do you already have a construction certificate?", type: "singleSelect", options: ["Yes", "No", "Not sure"] }
  ],
  lookup: [{ id: "lookupText", text: "Address or application number", type: "text" }]
};

export const glossary = [
  ["DA", "Development Application."],
  ["LEP", "Local Environmental Plan, local land-use controls."],
  ["DCP", "Development Control Plan, detailed design guidance."],
  ["BASIX", "Sustainability requirements for certain residential works."],
  ["CDC", "Complying Development Certificate pathway for some works."],
  ["exempt development", "Low-impact works that may not need DA, if all criteria are met."],
  ["s4.55", "A legal pathway to modify an already approved DA."],
  ["construction certificate", "Certificate needed before building work starts."],
  ["Plan of Management", "Document describing how a venue manages operations and impacts."]
];
