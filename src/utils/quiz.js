export function isAnswerCorrect(question, answer) {
  if (!question || answer === undefined || answer === null) return false
  if (question.type === 'multiple') {
    if (!Array.isArray(answer) || !Array.isArray(question.answer)) return false
    const selected = [...answer].sort((a, b) => a - b)
    const correct = [...question.answer].sort((a, b) => a - b)
    return selected.length === correct.length && selected.every((value, index) => value === correct[index])
  }
  if (question.type === 'matching') {
    if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false
    return question.matches.every(match => answer[match.id] === question.answer[match.id])
  }
  return answer === question.answer
}

export function formatAnswer(question, answer) {
  if (answer === undefined || answer === null) return 'Not answered'
  if (question.type === 'multiple') {
    return Array.isArray(answer) && answer.length
      ? answer.map(index => `${String.fromCharCode(65 + index)}. ${question.options[index]}`).join('; ')
      : 'Not answered'
  }
  if (question.type === 'matching') {
    return question.matches.map(match => {
      const index = answer?.[match.id]
      return `${match.prompt}: ${index === undefined ? 'Not answered' : question.options[index]}`
    }).join('; ')
  }
  return question.options[answer] ?? 'Not answered'
}

export function calculateScore(answers, questionList) {
  const correct = questionList.filter(q => isAnswerCorrect(q, answers[q.id])).length
  return { correct, total: questionList.length, percentage: questionList.length ? Math.round(correct / questionList.length * 100) : 0 }
}

export function getWeakDomains(history, questions) {
  const stats = {}
  questions.forEach(q => {
    const attempts = history.filter(a => a.questionId === q.id)
    if (!attempts.length) return
    stats[q.domain] ??= { attempted: 0, correct: 0 }
    stats[q.domain].attempted += attempts.length
    stats[q.domain].correct += attempts.filter(a => a.correct).length
  })
  return Object.entries(stats).map(([domain, s]) => ({
    domain, attempted: s.attempted, percentage: Math.round(s.correct / s.attempted * 100)
  })).sort((a, b) => a.percentage - b.percentage)
}
