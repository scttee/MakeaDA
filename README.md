# Planning Pathway Guide (City of Sydney prototype)

A plain-English prototype built with Next.js App Router and local data only.

## Setup

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Routes

- `/` home
- `/home-property`
- `/business-premises`
- `/after-approval`
- `/journey/[slug]`
- `/journey/[slug]/questions`
- `/result`
- `/glossary`
- `/admin/content`
- `/admin/analytics`

## Where to change content

- Theme tokens: `app/globals.css`
- Categories, journeys, and questions: `data/content.ts`
- Official links constants: `lib/constants.ts`
- Rules engine and outputs: `lib/rules.ts`

## Content governance

- **What is in JSON/TS content**: category hub text, journey tiles, question sets, and glossary definitions are maintained in local content files (`data/content.ts`) and surfaced in `/admin/content` for in-browser review/export.
- **How to review content**: content editors can compare journey copy in route pages, test question flows, and export JSON from `/admin/content` for legal/policy review before code updates.
- **How to add a new journey without breaking rules**:
  1. Add journey metadata and example tiles to `data/content.ts`.
  2. Add journey-specific questions in `journeyExtraQuestions`.
  3. Add/adjust rules in `lib/rules.ts` using DSL operators (`equals`, `includes`, `notSure`, `anyOf`, `allOf`).
  4. Add or update a unit test in `test/rules.test.ts`.

## Notes

- This tool gives guidance only and links users to official City and NSW pages for confirmation.
- No backend is used. Answers and analytics are stored in `localStorage`.
