import { z } from 'zod';

export const recipeClassificationValidation = z.object({
    ingredient: z.string().min(1, 'Ingredient is required'),
    spice: z.string().min(1, 'spice is required'),
});

export const recipeDetailClassificationValidation = z.string().min(1, 'id is required')
    ;
