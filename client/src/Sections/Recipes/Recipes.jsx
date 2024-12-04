import styles from './recipes.module.css';
import useFetch from '../../Hooks/useFetch';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import { useContext } from 'react';
import { SearchIngredientsContext } from '../../utils/SearchedIngredientsContext';
import Searchbar from '../../Components/Searchbar/Searchbar';

export default function Recipes() {
    
    const {searchedIngredients, selectedRecipe, setSelectedRecipe} = useContext(SearchIngredientsContext);
    const { data: recipes, isLoading, error } = useFetch("http://localhost:4000/recipes");
    const { data: recipeIngredients } = useFetch("http://localhost:4000/recipe_ingredients");
    
    let filteredRecipes = [];
    if (recipes && recipeIngredients) {
        const filteredIds = recipeIngredients.filter((recipeIngredient) =>
            searchedIngredients.some(ingredient => ingredient.id === recipeIngredient.ingredient_id)
        );
        const filteredRecipeIds = filteredIds.map((recipeIngredient) => recipeIngredient.recipe_id);
        filteredRecipes = recipes.filter((recipe) => filteredRecipeIds.includes(recipe.id));
    }

    const handleClick = (recipe)=> {
        setSelectedRecipe(recipe);
        console.log('selected recipe + ');
        console.log(selectedRecipe)
    }

   
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <p>Error: {error}</p>
    return (
        <section className={styles.recipes}>
            <h2>Recipes</h2>
            {filteredRecipes !== undefined && filteredRecipes.map((recipe, index) => {
                return  (
                <div key={index}  onClick={()=> handleClick(recipe)}>
                    <RecipeCard name={recipe.name} />
                </div>
                )
            })}
        </section>
    )
}