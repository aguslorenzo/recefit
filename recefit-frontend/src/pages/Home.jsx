import { useNavigate } from "react-router-dom"
import GoalCard from "../components/GoalCard"

const goals = [
    { id: 'volumen', label: 'Volumen', icon: '🏋️' },
    { id: 'definicion', label: 'Definición', icon: '🏃' },
    { id: 'perder-peso', label: 'Perder peso', icon: '🔥' },
    { id: 'recien-empiezo', label: 'Recién empiezo', icon: '🌱' },
]

export default function Home() {
    const navigate = useNavigate()

    const handleGoalSelect = (goalId) => {
        navigate(`/results?goal=${goalId}`)
    }

    return (
        <div className="home">
            <h1>¿Cuál es tu objetivo?</h1>
            <p>Encontrá recetas pensadas para tu alimentación</p>
            <div className="goals-grid">
                {goals.map(goal => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        onClick={() => handleGoalSelect(goal.id)}
                    />
                ))}
            </div>
        </div>
    )
}