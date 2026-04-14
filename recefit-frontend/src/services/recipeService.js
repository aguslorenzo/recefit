import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

export const getRecipes = (goal, intolerances = '', vegetarian = false) => {
    return axios.get(`${BASE_URL}/recipes`, {
        params: { goal, intolerances, vegetarian}
    })
}
export const getRecipeById = (id) => {
    return axios.get(`${BASE_URL}/recipes/${id}`)
}