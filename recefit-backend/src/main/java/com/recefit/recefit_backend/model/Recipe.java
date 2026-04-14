package com.recefit.recefit_backend.model;

import java.util.List;

import lombok.Data;

@Data
public class Recipe {
    private int id;
    private String title;
    private String image;
    private int calories;
    private double protein;
    private double carbs;
    private double fat;
    private String instructions;
    private List<String> ingredients;
}