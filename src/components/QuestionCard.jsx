export default function QuestionCard({ question, selected, onSelect, submitted, onNext, index, total }) {
  const answered = selected !== undefined && selected !== null
  return <section className="panel question-panel">
    <div className="question-meta"><span>{question.domain}</span><div><span className="tag">{question.difficulty}</span>{question.scenario && <span className="tag scenario">Scenario</span>}</div></div>
    <div className="question-count">QUESTION {index + 1} OF {total}</div>
    <h2>{question.question}</h2>
    <div className="options">{question.options.map((option, i) => {
      let cls = 'option'
      if (selected === i) cls += ' selected'
      if (submitted && i === question.answer) cls += ' correct'
      if (submitted && selected === i && i !== question.answer) cls += ' incorrect'
      return <button key={option} className={cls} disabled={submitted} onClick={() => onSelect(i)}><span className="option-letter">{String.fromCharCode(65+i)}</span>{option}</button>
    })}</div>
    {submitted && <div className="explanation"><strong>{selected === question.answer ? 'Correct answer' : 'Review this answer'}</strong><p>{question.explanation}</p><div className="option-explanations">{question.optionExplanations?.map((e,i)=><p key={i}><b>{String.fromCharCode(65+i)}.</b> {e}</p>)}</div></div>}
    <div className="question-footer"><span>{answered ? 'Answer selected' : 'Choose the best answer'}</span>{submitted ? <button className="primary-btn" onClick={onNext}>Next question →</button> : <button className="primary-btn" disabled={!answered} onClick={onNext}>Check answer</button>}</div>
  </section>
}