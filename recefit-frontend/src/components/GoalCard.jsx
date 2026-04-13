export default function GoalCard({ goal , onClick }) {
    return (
        <div className="goal-card" onClick={onClick}>
            <span className="goal-icon">{goal.icon}</span>
            <span className="goal-label">{goal.label}</span>
        </div>
    )
}