import { questions } from '../data/questions'

export function validateQuestionBank(bank = questions) {
  const ids = new Set()
  const errors = []
  for (const q of bank) {
    if (!q.id || ids.has(q.id)) errors.push(`Missing or duplicate question id: ${q.id || '(missing)'}`)
    ids.add(q.id)
    if (!q.domain || !q.question || !Array.isArray(q.options) || q.options.length < 2) errors.push(`Incomplete question: ${q.id}`)
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`Invalid answer index: ${q.id}`)
    if (!Array.isArray(q.optionExplanations) || q.optionExplanations.length !== q.options.length) errors.push(`Option explanations do not match options: ${q.id}`)
  }
  return { valid: errors.length === 0, count: bank.length, errors }
}
