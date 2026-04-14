package com.recefit.recefit_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recefit.recefit_backend.model.Recipe;
import com.recefit.recefit_backend.service.RecipeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecIpeController {
    private final RecipeService recipeService;

    @GetMapping
    public List<Recipe> getRecipes(
            @RequestParam String goal,
            @RequestParam(required = false, defaultValue = "") String intolerances,
            @RequestParam(required = false, defaultValue = "false") boolean vegetarian
    ) {
        return recipeService.getRecipesByGoal(goal, intolerances, vegetarian);
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable int id) {
        return recipeService.getRecipeById(id);
    }
}