import styles from "./recipes.module.css";
import useFetch from "../../Hooks/useFetch";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import { useContext } from "react";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext";
import { Link } from "react-router-dom";

export default function Recipes() {
  const { searchedIngredients, selectedRecipe, setSelectedRecipe } = useContext(
    SearchIngredientsContext,
  );
  const {
    data: recipes,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/recipes");
  const { data: recipeIngredients } = useFetch(
    "http://localhost:4000/api/recipe_ingredients",
  );

  let filteredRecipes = undefined;
  if (recipes && recipeIngredients) {
    // Check all the recipes
    filteredRecipes = recipes.filter((recipe) => {
      // Get all the ingredients for every recipe
      const recipeIngredientsForRecipe = recipeIngredients.filter(
        (recipeIngredient) => recipeIngredient.recipe_id === recipe.id
      );
  
      // Get the num of ingredients for that recipe
      const totalIngredients = recipeIngredientsForRecipe.length;
  
      //How many of those ingredients are in the searchedIngredients?
      const matchingIngredientsCount = recipeIngredientsForRecipe.filter((recipeIngredient) =>
        Array.from(searchedIngredients).some(
          (ingredient) => ingredient.id === recipeIngredient.ingredient_id
        )
      ).length;
  
      //Calculate how many of those ingredients match in %
      const matchingPercentage = (matchingIngredientsCount / totalIngredients) * 100;
  
      return matchingPercentage >= 40;
    });
  }


  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.recipes}>
      <h2>Recipes</h2>
      <div className={styles.recipeswrapper}>
        {filteredRecipes !== undefined &&
          filteredRecipes.map((recipe) => {
            return (
                <div 
              
                  key={recipe.id}>
                  <RecipeCard name={recipe.name} id={recipe.id} />
                </div>
            );
          })}
          {console.log('filtered recipes', filteredRecipes)}
          {filteredRecipes=== undefined || filteredRecipes.length === 0 &&
          <div className={styles.recipenotfound}>
          <h4>We couldn't find any recipe with those ingredients!</h4>
          <p>if you come up with an idea don't doubt to be the first to </p>
          <Link to='/add-recipe'>add it!</Link>
          </div>
          }
      </div>
    </section>
  );
}
