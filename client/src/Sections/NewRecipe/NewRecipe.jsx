import styles from "./newrecipe.module.css";
import { useState, useContext } from "react";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext";
import Searchbar from "../../Components/Searchbar/Searchbar";
import useFetch from "../../Hooks/useFetch";
import FormCard from "../../Components/FormCard/FormCard";
import { useNavigate } from "react-router-dom";

export default function NewRecipe() {
  const { recipeIngredients, setRecipeIngredients } = useContext(
    SearchIngredientsContext,
  );
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [calories, setCalories] = useState(0);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(["", "", ""]);
  const [recipePicture, setRecipePicture] = useState();
  const [RecipeCategories, setRecipeCategories] = useState([]);
  const {data: categories} = useFetch('http://localhost:4000/api/categories');
  const [currentFields, setCurrentFields] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

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
      categoryIds: RecipeCategories,
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload recipe");
      }

      alert("Recipe uploaded successfully!");
      navigate('/');
      
    } catch (error) {
      console.error("Error uploading recipe:", error);
      alert("There was an error uploading the recipe.");
    }
  };

  const renderStep = ()=> {
    switch(currentFields) {
      case 0:
        return (
          <>
            <div>
            <label>Recipe Name:</label>
            <input
              className={styles.textinput}
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            ></input>
          </div>
          <label>Ingredients:</label>
          <div className={styles.searchbardiv}>
            <Searchbar hero={false} />
          </div>
        </>
        );
      case 1:
          return (
        <>
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
          <div className={styles.buttoncontainer}>
            <button type="button" onClick={() => handleStepsButton("+")}>
              +
            </button>
            <button type="button" onClick={() => handleStepsButton("-")}>
              -
            </button>
          </div>
        </>
          );
      case 2:
        return (
          <>
            <div>
            <label>Upload a picture </label>
            <input
              className={styles.imginput}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
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
          </>
        );
        case 3:
          return (
            <>     
            <p>Category</p>
            <div className={styles.categories}>
                {categories && categories.map((category) =>
                <label key={category.id}>
                  <input type='checkbox'
                  checked={RecipeCategories.includes(category.id)} 
                  value={category.id}
                  onChange={(e)=> {
                    if(e.target.checked) {
                      setRecipeCategories(prevCategories => [...prevCategories, category.id])
                    }
                    else {
                      setRecipeCategories(prevCategories => prevCategories.filter((id) => id !== category.id))
                    }
                  }}>
                  </input>
                {category.name}</label>)}
            </div>
            <button onClick={handleSubmit}>Upload!</button>
          </>
          )
    }
  }

  const handleNext = ()=> {
    if (currentFields < 3 && !transitioning) {
      setTransitioning(true)
      setTimeout(()=> {
        setCurrentFields(currentFields+1)
        setTransitioning(false)
      }, 400)
    }
  }

  const handlePrev = ()=> {
    if(currentFields > 0 && !transitioning) {
      setTransitioning(true);
      setTimeout(()=> {
        setCurrentFields(currentFields-1)
        setTransitioning(false);
      }, 400)
    }
  }

  return (
    <section className={styles.newrecipe}>
      <div>
      <h2>Create a recipe</h2>
        <div className={styles.buttonbox}>
              <button disabled={currentFields === 0} type='button' onClick={handlePrev}>Prev</button>
              <button disabled={currentFields === 3} type='button' onClick={handleNext}>Next</button>
        </div>
      </div>
      <form className={styles.recipeform}>
        <div className={styles.inputcards}>
          <div className={`${styles.fieldwrapper} ${transitioning ? styles.transitioning : ''}`}>
            {renderStep()}
          </div>
        </div>
       
      </form>
    </section>
  );
}
