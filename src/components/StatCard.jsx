export default function StatCard({ label, value, detail, icon }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><b>{icon}</b></div><strong>{value}</strong><small>{detail}</small></div>
}