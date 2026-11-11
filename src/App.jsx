import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import QuestionCard from './components/QuestionCard'
import { modules, domains } from './data/modules'
import { questions } from './data/questions'
import { useLocalStorage } from './hooks/useLocalStorage'
import { calculateScore, getWeakDomains } from './utils/quiz'

const initialProgress = { history: [], completedModules: [], exams: [] }

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [progress, setProgress] = useLocalStorage('suitefoundation-progress-v1', initialProgress)
  const [practiceDomain, setPracticeDomain] = useState('All domains')
  const [difficulty, setDifficulty] = useState('All levels')
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [moduleOpen, setModuleOpen] = useState(null)
  const [exam, setExam] = useState(null)
  const [examAnswers, setExamAnswers] = useState({})
  const [examIndex, setExamIndex] = useState(0)
  const [examSeconds, setExamSeconds] = useState(60 * 60)
  const [examFinished, setExamFinished] = useState(false)

  const attempted = progress.history.length
  const correct = progress.history.filter(a => a.correct).length
  const accuracy = attempted ? Math.round(correct / attempted * 100) : 0
  const filteredQuestions = useMemo(() => questions.filter(q =>
    (practiceDomain === 'All domains' || q.domain === practiceDomain) &&
    (difficulty === 'All levels' || q.difficulty === difficulty)
  ), [practiceDomain, difficulty])
  const currentQuestion = filteredQuestions[practiceIndex % Math.max(filteredQuestions.length, 1)]
  const weakDomains = getWeakDomains(progress.history, questions)

  function changeFilter(setter, value) { setter(value); setPracticeIndex(0); setSelected(null); setSubmitted(false) }

  function checkPractice() {
    if (!currentQuestion || selected === null) return
    const correctAnswer = selected === currentQuestion.answer
    setProgress(p => ({ ...p, history: [...p.history, { questionId: currentQuestion.id, correct: correctAnswer, date: new Date().toISOString() }] }))
    setSubmitted(true)
  }

  function nextPractice() {
    setPracticeIndex(i => (i + 1) % Math.max(filteredQuestions.length, 1))
    setSelected(null); setSubmitted(false)
  }

  function startExam() {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(questions.length, 20))
    setExam(shuffled); setExamAnswers({}); setExamIndex(0); setExamSeconds(60 * 60); setExamFinished(false)
    setPage('exam')
  }

  function finishExam() {
    const score = calculateScore(examAnswers, exam || [])
    setProgress(p => ({ ...p, exams: [...p.exams, { ...score, date: new Date().toISOString() }] }))
    setExamFinished(true)
  }

  useEffect(() => {
    if (!exam || examFinished) return
    const timer = window.setInterval(() => {
      setExamSeconds(seconds => {
        if (seconds <= 1) {
          window.clearInterval(timer)
          setExamFinished(true)
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [exam, examFinished])

  const examQuestion = exam?.[examIndex]
  const examScore = exam ? calculateScore(examAnswers, exam) : null

  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} />
    <main className="main-content">
      <header className="topbar"><div><span className="eyebrow">ORACLE NETSUITE</span><h1>{({dashboard:'Your learning dashboard',learn:'Learning modules',practice:'Question practice',exam:'Exam simulator',progress:'Your progress'})[page]}</h1></div><div className="topbar-right"><span className="status-dot"></span> Study mode <div className="avatar">SF</div></div></header>
      {page === 'dashboard' && <div className="page-content">
        <section className="welcome-banner"><div><span className="eyebrow light">SUITEFOUNDATION ACCREDITATION</span><h2>Build your NetSuite knowledge.</h2><p>Learn the fundamentals, practise with exam-style questions and identify the areas to revisit.</p><button className="white-btn" onClick={() => setPage('learn')}>Continue learning <b>→</b></button></div><div className="banner-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="book-icon">▤</div><div className="spark spark-one">✦</div><div className="spark spark-two">✧</div></div></section>
        <div className="stats-grid"><StatCard label="Questions attempted" value={attempted} detail="Across practice sessions" icon="✓"/><StatCard label="Answer accuracy" value={`${accuracy}%`} detail="Based on your practice history" icon="↗"/><StatCard label="Modules completed" value={`${progress.completedModules.length}/${modules.length}`} detail="Learning modules" icon="▤"/><StatCard label="Mock exams" value={progress.exams.length} detail="Completed exam simulations" icon="◷"/></div>
        <div className="section-heading"><div><span className="eyebrow">YOUR STUDY PLAN</span><h2>Explore the syllabus</h2></div><button className="text-btn" onClick={() => setPage('learn')}>View all modules →</button></div>
        <div className="domain-grid">{domains.map((d,i)=><button className="domain-card" key={d} onClick={()=>{setPracticeDomain(d);setPage('practice')}}><span className="domain-number">0{i+1}</span><h3>{d}</h3><p>{modules.filter(m=>m.domain===d).length} learning modules</p><span className="card-arrow">↗</span></button>)}</div>
        <div className="bottom-grid"><div className="panel"><div className="panel-heading"><h3>Recommended next step</h3><span className="tag">Start here</span></div><h2>Test your understanding</h2><p>Work through the growing question bank across the five core syllabus areas and read explanations for every answer.</p><button className="primary-btn" onClick={()=>setPage('practice')}>Start practice →</button></div><div className="panel"><div className="panel-heading"><h3>Exam readiness</h3><span>◷</span></div><p className="muted">When you are ready, launch a timed mock exam with randomly selected questions.</p><button className="outline-btn" onClick={startExam}>Launch exam simulator</button></div></div>
      </div>}
      {page === 'learn' && <div className="page-content"><div className="intro-row"><div><span className="eyebrow">LEARNING PATH</span><h2>Learn the essentials</h2><p>Work through the modules at your own pace. Each topic includes key points and a practical NetSuite scenario.</p></div><div className="progress-pill">{progress.completedModules.length} of {modules.length} completed</div></div><div className="module-list">{modules.map((m,i)=><article className="module-card" key={m.id}><div className="module-index">{String(i+1).padStart(2,'0')}</div><div className="module-body"><div className="module-meta"><span>{m.domain}</span><span>{m.duration}</span></div><h3>{m.title}</h3><p>{m.summary}</p><div className="module-actions"><span className="tag">{m.level}</span><button className="text-btn" onClick={()=>setModuleOpen(moduleOpen===m.id?null:m.id)}>{moduleOpen===m.id?'Close module':'Open module'} →</button></div>{moduleOpen===m.id&&<div className="module-detail"><h4>Key points</h4><ul>{m.points.map(p=><li key={p}>{p}</li>)}</ul><h4>Practical scenario</h4><p>{m.scenario}</p><button className="primary-btn small" onClick={()=>setProgress(p=>({...p,completedModules:p.completedModules.includes(m.id)?p.completedModules:[...p.completedModules,m.id]}))}>{progress.completedModules.includes(m.id)?'Completed ✓':'Mark as complete'}</button></div>}</div><div className={progress.completedModules.includes(m.id)?'completion done':'completion'}>{progress.completedModules.includes(m.id)?'✓':'○'}</div></article>)}</div></div>}
      {page === 'practice' && <div className="page-content"><div className="intro-row"><div><span className="eyebrow">KNOWLEDGE CHECK</span><h2>Practice questions</h2><p>Choose a domain and difficulty, then answer each question and review the explanation.</p></div><span className="tag">{filteredQuestions.length} questions available</span></div><div className="filters"><label>Domain<select value={practiceDomain} onChange={e=>changeFilter(setPracticeDomain,e.target.value)}><option>All domains</option>{domains.map(d=><option key={d}>{d}</option>)}</select></label><label>Difficulty<select value={difficulty} onChange={e=>changeFilter(setDifficulty,e.target.value)}><option>All levels</option><option>Beginner</option><option>Intermediate</option><option>Exam Level</option></select></label></div>{currentQuestion?<QuestionCard question={currentQuestion} selected={selected} onSelect={setSelected} submitted={submitted} onNext={submitted?nextPractice:checkPractice} index={practiceIndex} total={filteredQuestions.length}/>:<div className="panel">No questions match these filters.</div>}<p className="fine-print">Practice questions are original study material and are not official Oracle exam questions.</p></div>}
      {page === 'exam' && <div className="page-content"><div className="intro-row"><div><span className="eyebrow">TIMED ASSESSMENT</span><h2>Exam simulator</h2><p>Take a timed practice assessment. Your answers are scored when you finish.</p></div>{exam&&!examFinished&&<div className="timer">◷ {Math.floor(examSeconds/60).toString().padStart(2,'0')}:{(examSeconds%60).toString().padStart(2,'0')}</div>}</div>{!exam&&<div className="panel exam-start"><div className="exam-icon">◷</div><h2>Ready to test your knowledge?</h2><p>This simulator selects up to 20 random questions from the full question bank. You can move between questions and review your result at the end.</p><ul><li>60-minute suggested time limit</li><li>Questions sampled across the syllabus</li><li>Score and answer review at the end</li></ul><button className="primary-btn" onClick={startExam}>Start mock exam →</button></div>}{exam&&!examFinished&&<div className="exam-layout"><div className="panel exam-main"><div className="question-meta"><span>{examQuestion.domain}</span><span className="tag">{examQuestion.difficulty}</span></div><div className="question-count">QUESTION {examIndex+1} OF {exam.length}</div><h2>{examQuestion.question}</h2><div className="options">{examQuestion.options.map((o,i)=><button key={o} className={examAnswers[examQuestion.id]===i?'option selected':'option'} onClick={()=>setExamAnswers(a=>({...a,[examQuestion.id]:i}))}><span className="option-letter">{String.fromCharCode(65+i)}</span>{o}</button>)}</div><div className="exam-nav"><button className="outline-btn" disabled={examIndex===0} onClick={()=>setExamIndex(i=>i-1)}>← Previous</button><button className="primary-btn" onClick={()=>examIndex===exam.length-1?finishExam():setExamIndex(i=>i+1)}>{examIndex===exam.length-1?'Finish exam':'Next question →'}</button></div></div><aside className="panel question-map"><h3>Question overview</h3><div className="number-grid">{exam.map((q,i)=><button key={q.id} className={`${i===examIndex?'current':''} ${examAnswers[q.id]!==undefined?'answered':''}`} onClick={()=>setExamIndex(i)}>{i+1}</button>)}</div><p>{Object.keys(examAnswers).length} of {exam.length} answered</p><button className="outline-btn full" onClick={finishExam}>Finish and score</button></aside></div>}{exam&&examFinished&&<div className="panel result-panel"><div className="result-circle">{examScore.percentage}%</div><span className="eyebrow">MOCK EXAM COMPLETE</span><h2>{examScore.percentage>=70?'Good work — keep building on this.':'A useful baseline for your revision.'}</h2><p>You answered {examScore.correct} out of {examScore.total} questions correctly.</p><div className="result-actions"><button className="primary-btn" onClick={startExam}>Try another exam</button><button className="outline-btn" onClick={()=>{setExam(null);setPage('progress')}}>View progress</button></div><div className="review-list"><h3>Answer review</h3>{exam.map((q,i)=><div className="review-row" key={q.id}><span className={examAnswers[q.id]===q.answer?'review-correct':'review-wrong'}>{examAnswers[q.id]===q.answer?'✓':'×'}</span><div><b>Q{i+1}. {q.question}</b><p>{q.explanation}</p></div></div>)}</div></div>}</div>}
      {page === 'progress' && <div className="page-content"><div className="intro-row"><div><span className="eyebrow">PERFORMANCE</span><h2>Your learning progress</h2><p>Use your results to decide which topics deserve more revision.</p></div><button className="outline-btn" onClick={()=>{if(confirm('Clear all locally stored learning progress?'))setProgress(initialProgress)}}>Reset progress</button></div><div className="stats-grid"><StatCard label="Questions attempted" value={attempted} detail="Practice answers recorded" icon="✓"/><StatCard label="Accuracy" value={`${accuracy}%`} detail="Across all attempts" icon="↗"/><StatCard label="Modules completed" value={`${progress.completedModules.length}/${modules.length}`} detail="Learning path" icon="▤"/><StatCard label="Exams completed" value={progress.exams.length} detail="Mock assessments" icon="◷"/></div><div className="panel"><div className="panel-heading"><h3>Topic performance</h3><span className="muted">Lowest scoring areas first</span></div>{weakDomains.length?weakDomains.map(d=><div className="weak-row" key={d.domain}><div><b>{d.domain}</b><span>{d.attempted} attempts</span></div><div className="bar-track"><div className="bar-fill" style={{width:`${d.percentage}%`}}></div></div><strong>{d.percentage}%</strong></div>):<div className="empty-state"><div>▥</div><h3>Your topic insights will appear here</h3><p>Answer some practice questions to see which syllabus areas are strongest and which need more attention.</p><button className="primary-btn" onClick={()=>setPage('practice')}>Start practising</button></div>}</div><div className="panel exam-history"><h3>Exam history</h3>{progress.exams.length?progress.exams.slice().reverse().map((e,i)=><div className="history-row" key={`${e.date}-${i}`}><span>Mock exam · {new Date(e.date).toLocaleDateString('en-GB')}</span><b>{e.percentage}%</b><span>{e.correct}/{e.total} correct</span></div>):<p className="muted">No mock exams completed yet.</p>}</div></div>}
      <footer className="footer">SuiteFoundation Academy · Independent learning resource · Not affiliated with Oracle</footer>
    </main>
  </div>
}