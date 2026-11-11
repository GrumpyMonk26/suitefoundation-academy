const items = [
  ['dashboard', '⌂', 'Dashboard'],
  ['learn', '▤', 'Learning modules'],
  ['practice', '✓', 'Question practice'],
  ['exam', '◷', 'Exam simulator'],
  ['progress', '▥', 'My progress'],
]

export default function Sidebar({ page, setPage }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark">SF</div><div><strong>SuiteFoundation</strong><span>ACADEMY</span></div></div>
    <div className="nav-label">STUDY</div>
    <nav>{items.map(([id, icon, label]) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => setPage(id)}><span>{icon}</span>{label}</button>)}</nav>
    <div className="sidebar-note"><strong>Exam preparation</strong><p>Build your understanding one topic at a time.</p><span>Independent study resource</span></div>
  </aside>
}