import { questions } from '../src/data/questions.js'

const ids = new Set()
const errors = []
for (const q of questions) {
  if (!q.id || ids.has(q.id)) errors.push(`Missing or duplicate ID: ${q.id}`)
  ids.add(q.id)
  if (!q.domain || !q.question || !Array.isArray(q.options) || q.options.length < 2) errors.push(`Malformed question: ${q.id}`)
  if (q.type === 'multiple') {
    if (!Array.isArray(q.answer) || q.answer.length < 2 || q.answer.some(a => !Number.isInteger(a) || a < 0 || a >= q.options.length)) errors.push(`Invalid multiple answer: ${q.id}`)
  } else if (q.type === 'matching') {
    if (!Array.isArray(q.matches) || !q.matches.length || !q.answer || typeof q.answer !== 'object') errors.push(`Invalid matching question: ${q.id}`)
    else q.matches.forEach(match => {
      if (!Number.isInteger(q.answer[match.id]) || q.answer[match.id] < 0 || q.answer[match.id] >= q.options.length) errors.push(`Invalid matching answer: ${q.id}/${match.id}`)
    })
  } else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
    errors.push(`Invalid answer: ${q.id}`)
  }
  if (q.type !== 'matching' && (!Array.isArray(q.optionExplanations) || q.optionExplanations.length !== q.options.length)) errors.push(`Missing option explanations: ${q.id}`)
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Question bank valid: ${questions.length} questions`)
