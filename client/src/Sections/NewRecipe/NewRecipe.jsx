import styles from './newrecipe.module.css';
import { useState, useContext } from 'react';
import { SearchIngredientsContext } from '../../utils/SearchedIngredientsContext';
import Searchbar from '../../Components/Searchbar/Searchbar';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import useFetch from '../../Hooks/useFetch';



export default function NewRecipe() {
    const { data: categories, isLoading, error } = useFetch('http://localhost:4000/categories');
    const {recipeIngredients, setRecipeIngredients} = useContext(SearchIngredientsContext)
    const [recipeName, setRecipeName] = useState('');
    const [calories, setCalories] = useState(0);
    const [category, setCategory] = useState([]);
    const [time, setTime] = useState(0);
    const [steps, setSteps] = useState(['', '', '']);
    const [recipePicture, setRecipePicture] = useState()

    const handleStepChange = (e, index)=> {
        const newSteps = [...steps];
        newSteps[index] = e.target.value;
        setSteps(newSteps);
    }

    const handleStepsButton = (action) => {
        if (action === '+') {
            setSteps([...steps, ''])
        setSteps(newSteps) }
        else if (action === '-') {
            setSteps(steps.slice(0, steps.length - 1));
        }
        
    }

    const handleFileChange = (event) => {
        setRecipePicture(event.target.files[0]);
      };

      const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        console.log('category', category);
    
        setCategory((prevCategories) => {
            if (checked) {

                return [...prevCategories, value];
            } else {
 
                return prevCategories.filter((category) => category !== value);
            }
        });
    };


      const handleSubmit = async (e) => {
        e.preventDefault();
    
    
            const recipeData = {
                name: recipeName,
                instructions: steps,
                ingredientIds: recipeIngredients.map((ingredient) => ingredient.id),
                calories_per_100: calories,
                time: time,
                categoryIds: category
            };

            console.log("Recipe Data to Send:", recipeData);
    
            try {
                const response = await fetch("/recipes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(recipeData),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to upload recipe");
                }
    
                alert("Recipe uploaded successfully!");
            } catch (error) {
                console.error("Error uploading recipe:", error);
                alert("There was an error uploading the recipe.");
            }
        
    
    
    }

    return (
        <section className={styles.newrecipe}>
            <h2>Create a recipe</h2>
            <form className={styles.recipeform}>
                <div>
                    <label>Recipe Name:</label>
                    <input className={styles.textinput} type='text'
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}></input>
                </div>
                {steps.map((step, index) => 
                    <div key={index}>
                    <label>Step {index +1}</label>
                    <input className={styles.textinput} type='text'
                    value={step}
                    onChange={(e)=>handleStepChange(e, index)}></input>
                </div>
                )}
                <div>
                    <button type='button' onClick={()=>handleStepsButton('+')}>+</button>
                    <button type='button' onClick={()=>handleStepsButton('-')}>-</button>
                </div>
                <div>
                <label>Upload a picture </label>
                <input  className={styles.imginput} type="file" accept="image/*" onChange={handleFileChange}/>
                </div>
                <label>Ingredients:</label>
                <div className={styles.searchbardiv}>
                    <Searchbar hero={false} />
                </div>
                <label>Category</label>
                <div className={styles.categories}>
                {(categories && !isLoading) && categories.map((category, index) =>
                <div>
                <input type='checkbox' key={index} value={category.id} onChange={handleCategoryChange}></input>
                <label>{category.name}</label>
                </div>)}
                </div>
                <div>
                    <label>Approximate Calories per Serving:</label>
                    <input className={styles.textinput} type='number'
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}></input>
                </div>
                <div>
                    <label>How many minutes does it take?</label>
                    <input className={styles.textinput} type='number'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}></input>
                </div>
                <button onClick={handleSubmit}>Upload!</button>

            </form>
        </section>
    )

}