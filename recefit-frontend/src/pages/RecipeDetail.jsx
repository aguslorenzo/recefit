import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RecipeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipeById(id)
            .then(res => setRecipe(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>Loading...</p> //TODO CAMBIAR
    if (!recipe) return <p>Recipe not found</p> //TODO CAMBIAR

    return (
        <div>
            <div><Navbar /></div>
            <div className="recipe-detail">
                <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
                <img src={recipe.image} alt={recipe.title} className="detail-image" />
                <h1>{recipe.title}</h1>
                <div className="macros-row">
                    <span>🔥 {recipe.calories} kcal</span>
                    <span>💪 {recipe.protein}g proteína</span>
                    <span>🍞 {recipe.carbs}g carbos</span>
                    <span>🥑 {recipe.fat}g grasas</span>
                </div>
                <h2>Ingredientes</h2>
                <ul className="ingredients-list">
                    {recipe.ingredients?.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
                <h2>Preparación</h2>
                <div
                    className="instructions"
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
            </div>
            <div><Footer /></div>
        </div>

    )
}