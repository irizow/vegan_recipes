import styles from "./newrecipe.module.css";
import { useState, useContext } from "react";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext";
import Searchbar from "../../Components/Searchbar/Searchbar";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";

export default function NewRecipe() {
  const { recipeIngredients, setRecipeIngredients } = useContext(
    SearchIngredientsContext,
  );
  const [recipeName, setRecipeName] = useState("");
  const [calories, setCalories] = useState(0);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(["", "", ""]);
  const [recipePicture, setRecipePicture] = useState();

  const handleStepChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };

  const handleStepsButton = (action) => {
    if (action === "+") {
      const newSteps = [...steps];
      newSteps[steps.length] = "";
      setSteps(newSteps);
    } else if (action === "-") {
      const newSteps = steps.slice(0, steps.length - 1);
      setSteps(newSteps);
    }
  };

  const handleFileChange = (event) => {
    setRecipePicture(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      name: recipeName,
      instructions: steps,
      ingredientIds: recipeIngredients.map((ingredient) => ingredient.id),
      calories_per_100: calories,
      time: time,
    };

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
  };

  return (
    <section className={styles.newrecipe}>
      <h2>Create a recipe</h2>
      <form className={styles.recipeform}>
        <div>
          <label>Recipe Name:</label>
          <input
            className={styles.textinput}
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          ></input>
        </div>
        {steps.map((step, index) => (
          <div key={index}>
            <label>Step {index + 1}</label>
            <input
              className={styles.textinput}
              type="text"
              value={step}
              onChange={(e) => handleStepChange(e, index)}
            ></input>
          </div>
        ))}
        <div>
          <button type="button" onClick={() => handleStepsButton("+")}>
            +
          </button>
          <button type="button" onClick={() => handleStepsButton("-")}>
            -
          </button>
        </div>
        <div>
          <label>Upload a picture </label>
          <input
            className={styles.imginput}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <label>Ingredients:</label>
        <div className={styles.searchbardiv}>
          <Searchbar hero={false} />
        </div>
        <div>
          <label>Approximate Calories per Serving:</label>
          <input
            className={styles.textinput}
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          ></input>
        </div>
        <div>
          <label>How many minutes does it take?</label>
          <input
            className={styles.textinput}
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></input>
        </div>
        <button onClick={handleSubmit}>Upload!</button>
      </form>
    </section>
  );
}
