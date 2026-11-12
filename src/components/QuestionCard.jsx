import { isAnswerCorrect, formatAnswer } from '../utils/quiz'

export default function QuestionCard({ question, selected, onSelect, submitted, onNext, index, total, isLast = false, examMode = false }) {
  const type = question.type || 'single'
  const answered = type === 'multiple'
    ? Array.isArray(selected) && selected.length > 0
    : type === 'matching'
      ? question.matches?.every(match => selected?.[match.id] !== undefined)
      : selected !== undefined && selected !== null
  const correct = submitted && isAnswerCorrect(question, selected)

  function toggleOption(optionIndex) {
    if (type === 'multiple') {
      const current = Array.isArray(selected) ? selected : []
      onSelect(current.includes(optionIndex) ? current.filter(i => i !== optionIndex) : [...current, optionIndex])
    } else {
      onSelect(optionIndex)
    }
  }

  return <section className={`panel question-panel ${examMode ? 'exam-question-card' : ''}`}>
    {!examMode && <div className="question-meta"><span>{question.domain}</span><div><span className="tag">{question.difficulty}</span>{question.scenario && <span className="tag scenario">Scenario</span>}</div></div>}
    <div className="question-count">QUESTION {index + 1} OF {total}</div>
    <h2>{question.question}</h2>
    {type === 'matching' ? <div className="matching-list">
      {question.matches.map(match => <label className="matching-row" key={match.id}>
        <span><b>{match.id}.</b> {match.prompt}</span>
        <select value={selected?.[match.id] ?? ''} disabled={submitted} onChange={e => onSelect({ ...(selected || {}), [match.id]: e.target.value === '' ? undefined : Number(e.target.value) })}>
          <option value="">Choose an option</option>
          {question.options.map((option, i) => <option value={i} key={i}>{String.fromCharCode(65+i)}. {option}</option>)}
        </select>
        {submitted && <small className={selected?.[match.id] === question.answer[match.id] ? 'match-correct' : 'match-incorrect'}>{selected?.[match.id] === question.answer[match.id] ? 'Correct' : `Correct: ${question.options[question.answer[match.id]]}`}</small>}
      </label>)}
    </div> : <div className="options">{question.options.map((option, i) => {
      const isSelected = type === 'multiple' ? selected?.includes(i) : selected === i
      const isCorrect = type === 'multiple' ? question.answer.includes(i) : question.answer === i
      let cls = 'option'
      if (isSelected) cls += ' selected'
      if (submitted && isCorrect) cls += ' correct'
      if (submitted && isSelected && !isCorrect) cls += ' incorrect'
      return <button key={`${i}-${option}`} className={cls} disabled={submitted} onClick={() => toggleOption(i)}><span className="option-letter">{String.fromCharCode(65+i)}</span>{option}{type === 'multiple' && <span className="multi-hint">{isSelected ? '✓' : ' '}</span>}</button>
    })}</div>}
    {submitted && <div className="explanation"><strong>{correct ? 'Correct answer' : 'Review this answer'}</strong><p>{question.explanation}</p>
      {type === 'matching' ? <div className="option-explanations">{question.matches.map(match=><p key={match.id}><b>{match.id}.</b> {match.prompt} — {question.options[question.answer[match.id]]}</p>)}</div> :
      <><p><b>Your answer:</b> {formatAnswer(question, selected)}</p><p><b>Correct answer:</b> {formatAnswer(question, question.answer)}</p><div className="option-explanations">{question.optionExplanations?.map((e,i)=><p key={i}><b>{String.fromCharCode(65+i)}.</b> {e}</p>)}</div></>}
    </div>}
    {!examMode && <div className="question-footer"><span>{answered ? 'Answer selected' : type === 'multiple' ? 'Select all that apply' : type === 'matching' ? 'Complete every match' : 'Choose the best answer'}</span>{submitted ? <button className="primary-btn" onClick={onNext}>{isLast ? 'Finish session' : 'Next question →'}</button> : <button className="primary-btn" disabled={!answered} onClick={onNext}>Check answer</button>}</div>}
  </section>
}
