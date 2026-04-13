package com.recefit.recefit_backend.model;

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
}