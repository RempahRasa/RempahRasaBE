import { recipeCollection } from "../../app/firestore";
import { CLASSLIST } from "../../constant/classList";
import { ResponseError } from '../../error/response-error';

const getRecipeClassification = async (spice: string, ingredient: string) => {
    if (!CLASSLIST.includes(spice.toLocaleLowerCase())) {
        throw new ResponseError(400, 'Invalid Spice');
    }
    const recipesData = await recipeCollection
        .where('ingredients_cleaned', 'array-contains-any', [spice.toLowerCase()])
        .where('category', '==', ingredient.toLowerCase())
        .orderBy("loves", "desc")
        .where("loves", ">", 0)
        .limit(10)
        .get();

    const recipes = recipesData.docs.map((doc) => {
        const data = doc.data();
        return {
            id: data.id,
            title: data.title,
            category: data.category,
            loves: data.loves,
            spice

        };
    });
    if (!recipes) {
        throw new ResponseError(404, 'Recipe not found');
    }
    if (recipes.length === 0) {
        throw new ResponseError(404, 'Recipe not found');
    }
    return recipes;
}

const getRecipeClassificationDetail = async (id: string) => {
    const recipesData = await recipeCollection
        .where("id", "==", id)
        .get();

    const recipes = recipesData.docs.map((doc) => {
        const data = doc.data();
        return data;
    });
    if (recipes.length === 0) {
        throw new ResponseError(404, 'Recipe not found');
    }
    return recipes[0];
}

export { getRecipeClassification, getRecipeClassificationDetail };