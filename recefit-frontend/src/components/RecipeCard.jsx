import { useNavigate } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate()

  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="macros">
        <span>🔥 {recipe.calories} kcal</span>
        <span>💪 {recipe.protein}g proteína</span>
      </div>
    </div>
  )
}