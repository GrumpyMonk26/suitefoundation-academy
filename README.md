# SuiteFoundation Academy — React edition

A maintainable React + Vite version of the SuiteFoundation learning app.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Deploy
This is a standard Vite static site. On Netlify:
- Build command: `npm run build`
- Publish directory: `dist`

On Vercel or Cloudflare Pages use the same build command and `dist` output directory.

## Project structure
```text
src/
  components/       Reusable UI components
  data/             Learning modules and question bank
  hooks/            Reusable React hooks
  utils/            Scoring and persistence helpers
  App.jsx           Main application and navigation
  main.jsx          React entry point
  styles.css        Global styling
```

## Extending the question bank
Add question objects to `src/data/questions.js`. Each question follows this shape:
```js
{
  id: 'unique-id',
  domain: 'Setup and Administration',
  difficulty: 'Beginner',
  scenario: false,
  question: 'Question text?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: 0,
  explanation: 'Why the correct answer is correct.',
  optionExplanations: [
    'Why option A is or is not correct.',
    'Why option B is or is not correct.',
    'Why option C is or is not correct.',
    'Why option D is or is not correct.'
  ]
}
```
The included bank is a starter set of original practice questions, not official Oracle exam content. Review and expand it before relying on it for exam preparation.

## Progress and privacy
Progress is stored in the browser using `localStorage`. It is not synchronised between browsers or devices. Clearing browser site data removes locally stored progress.

## Important
This is an independent study aid and is not affiliated with or endorsed by Oracle. Always check the current official SuiteFoundation exam guide for the exam objectives and policies.


## Question bank structure

Questions are separated by syllabus domain in `src/data/questions/`:
- `setup-administration.js`
- `netSuite-user-interface.js`
- `standard-process-flows.js`
- `suiteanalytics.js`
- `maintenance-security.js`

`src/data/questions.js` is the single entry point imported by the app. Add new questions to the relevant domain file and keep IDs unique. Each question includes a difficulty, scenario flag, correct answer, overall explanation and an explanation for every option.

The bank currently contains 100 original practice questions. They are independent study material and are not official Oracle exam questions. Use `src/utils/validateQuestionBank.js` to validate IDs, answer indexes and option explanation counts.


## Latest question-bank update

The **Maintenance, Resources and Data Security** section has been expanded to 50 questions (`SECURITY-001` to `SECURITY-050`). The complete bank now contains 199 questions: 50 in Maintenance, Resources and Data Security, 17 in each of the other four domain files, and 15 in the original starter set.
