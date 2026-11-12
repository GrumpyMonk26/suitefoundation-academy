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

export function shuffleQuestions(questionList) {
  const shuffled = [...questionList]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function selectPracticeQuestions(questionList, recentlyUsedIds = [], sessionSize = 7) {
  if (!questionList.length) return []

  const count = Math.min(sessionSize, questionList.length)
  const recentSet = new Set(recentlyUsedIds)
  const unused = questionList.filter(question => !recentSet.has(question.id))
  const previouslyUsed = shuffleQuestions(questionList.filter(question => recentSet.has(question.id)))
  const candidates = [...shuffleQuestions(unused), ...previouslyUsed]

  // The first part of a new session uses questions not seen in recent sessions.
  // If fewer than seven remain, fill the rest from older questions without duplicates.
  return candidates.slice(0, count)
}
