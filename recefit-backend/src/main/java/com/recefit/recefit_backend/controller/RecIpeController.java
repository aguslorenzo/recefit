package com.recefit.recefit_backend.controller;

import com.recefit.recefit_backend.model.Recipe;
import com.recefit.recefit_backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
}