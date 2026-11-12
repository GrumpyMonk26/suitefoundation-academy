export function calculateScore(answers, questionList) {
  const correct = questionList.filter(q => answers[q.id] === q.answer).length
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