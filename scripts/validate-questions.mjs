import { questions } from '../src/data/questions.js'

const ids = new Set()
const errors = []
for (const q of questions) {
  if (!q.id || ids.has(q.id)) errors.push(`Missing or duplicate ID: ${q.id}`)
  ids.add(q.id)
  if (!q.domain || !q.question || !Array.isArray(q.options) || q.options.length !== 4) errors.push(`Malformed question: ${q.id}`)
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`Invalid answer: ${q.id}`)
  if (!Array.isArray(q.optionExplanations) || q.optionExplanations.length !== q.options.length) errors.push(`Missing option explanations: ${q.id}`)
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Question bank valid: ${questions.length} questions`)
