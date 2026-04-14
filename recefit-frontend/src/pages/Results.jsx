import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRecipes } from '../services/recipeService'
import RecipeCard from '../components/RecipeCard'

export default function Results() {
  const [searchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [vegetarian, setVegetarian] = useState(false)
  const [lactoseFree, setLactoseFree] = useState(false)

  const goal = searchParams.get('goal')

  useEffect(() => {
    const intolerances = lactoseFree ? 'dairy' : ''
    setLoading(true)
    getRecipes(goal, intolerances, vegetarian)
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [goal, vegetarian, lactoseFree])
  

  return (
    <div className="results">
      <div className="filters">
        <label>
          <input type="checkbox" checked={vegetarian} onChange={e => setVegetarian(e.target.checked)} />
          Vegetariano
        </label>
        <label>
          <input type="checkbox" checked={lactoseFree} onChange={e => setLactoseFree(e.target.checked)} />
          Sin lactosa
        </label>
      </div>
      {loading ? (
        <p>Cargando recetas...</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}