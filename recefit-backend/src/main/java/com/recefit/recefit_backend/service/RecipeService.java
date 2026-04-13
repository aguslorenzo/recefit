package com.recefit.recefit_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recefit.recefit_backend.model.Recipe;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${spoonacular.api.key}")
    private String apiKey;

    private static final String BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

    public List<Recipe> getRecipesByGoal(String goal, String intolerances, boolean vegetarian) {
        int minCalories = 0, maxCalories = 9999;
        int minProtein = 0;

        switch(goal){
            case "volumen" -> {minCalories = 500; minProtein = 30;}
            case "definicion" -> {minCalories = 300; maxCalories = 500; minProtein = 25;}
            case "perder-peso" -> {maxCalories = 400; minProtein = 20;}
            case "recien-empiezo" -> {minCalories = 300; maxCalories = 500; minProtein = 20;}
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(BASE_URL)
                .queryParam("apiKey", apiKey)
                .queryParam("addRecipeNutrition", true)
                .queryParam("minCalories", minCalories)
                .queryParam("maxCalories", maxCalories)
                .queryParam("minProtein", minProtein)
                .queryParam("number", 12);

        if (vegetarian) builder.queryParam("diet", "vegetarian");
        if (intolerances != null && !intolerances.isEmpty()) {
            builder.queryParam("intolerances", intolerances);
        }

        try {
            String response = restTemplate.getForObject(builder.toUriString(), String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode results = root.path("results");

            List<Recipe> recipes = new ArrayList<>();
            for (JsonNode node : results) {
                Recipe recipe = new Recipe();
                recipe.setId(node.path("id").asInt());
                recipe.setTitle(node.path("title").asText());
                recipe.setImage(node.path("image").asText());

                JsonNode nutrients = node.path("nutrition").path("nutrients");
                for (JsonNode nutrient : nutrients) {
                    String name = nutrient.path("name").asText();
                    double amount = nutrient.path("amount").asDouble();
                    switch (name) {
                        case "Calories" -> recipe.setCalories((int) amount);
                        case "Protein" -> recipe.setProtein(amount);
                        case "Carbohydrates" -> recipe.setCarbs(amount);
                        case "Fat" -> recipe.setFat(amount);
                    }
                }
                recipes.add(recipe);
            }
            return recipes;
        } catch (Exception e) {
            throw new RuntimeException("Error al llamar a Spoonacular: " + e.getMessage());
        }
    }
}