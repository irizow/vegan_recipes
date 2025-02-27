import styles from "./searchbar.module.css";
import { useContext, useState, useRef, useEffect } from "react";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext.jsx";
import useFetch from "../../Hooks/useFetch";

export default function Searchbar({ hero }) {
  const tagContainerRef = useRef(null);
  const [searching, setSearching] = useState(false);
  const { searchedIngredients, setSearchedIngredients } = useContext(
    SearchIngredientsContext,
  );
  const { recipeIngredients, setRecipeIngredients } = useContext(
    SearchIngredientsContext,
  );
  const [search, setSearch] = useState("");
  const {
    data: ingredients,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/ingredients");
  const filteredIngredients = ingredients
    ? ingredients
        .filter((ingredient) =>
          ingredient.name.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, 4)
    : ["Jackfruit", "Avocado", "Lemon", "Chickpeas"];

  const handleInputClick = () => {
    setSearching(true);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    console.log("search: " + e.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    if (hero) {
        if(searchedIngredients.has(ingredient)) {
          alert('Ingredient already added')
      }
        else {
        setSearchedIngredients((prevIngredients) =>
          new Set(prevIngredients).add(ingredient)
        )
        console.log(searchedIngredients)
        }
      }
      else {
        if(recipeIngredients.has(ingredient)) {
          alert('Ingredient already added')
        }
        else {
          setRecipeIngredients((prevIngredients) => 
            new Set(prevIngredients).add(ingredient)
          
          )
        }
    }
    }


  const deleteIngredient = (deletedIngredient) => {
    function updateSet(setFunction) {
      setFunction(prevIngredients => {
        const updatedIngredients = new Set(prevIngredients);
        updatedIngredients.delete(deletedIngredient);
        return updatedIngredients;
      })
    }
    if (hero) {
      updateSet(setSearchedIngredients)
    } else {
      updateSet(setRecipeIngredients)
      };
    }

  useEffect(()=>{
    const container = tagContainerRef.current

    if(container) {
      console.log('Container scrollWidth:', container.scrollWidth); // Log scrollWidth
    console.log('Container scrollLeft:', container.scrollLeft);
      container.scrollLeft = -container.scrollWidth;
    }

  }, [searchedIngredients, recipeIngredients])

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className={hero ? `${styles.searchbar}` : `${styles.formbar}`}
      onClick={handleInputClick}
    >
      <input type="text" onChange={handleInputChange} />
      {!searching && hero && searchedIngredients.size === 0 && (
        <>
          <span className={`${styles.tag} ${styles.pre}`}>onion  &#128473;</span>
          <span className={`${styles.tag} ${styles.pre}`}>carrots  &#128473;</span>
          <span className={`${styles.tag} ${styles.pre}`}>tofu  &#128473;</span>
        </>
      )}
      {search && (
        <div className={styles.searchresults}>
          {filteredIngredients.map((ingredient, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleIngredientClick(ingredient);
                }}
              >
                <p>{ingredient.name}</p>
              </div>
            );
          })}
        </div>
      )}
      {searchedIngredients && hero ? (
        <div ref={tagContainerRef} className={styles.tagcontainer}>
          {[...searchedIngredients].map((ingredient, index) => {
            return (
              <span key={index} className={`${styles.tag} ${styles.post}`}>
                {ingredient.name}
                <span onClick={() => deleteIngredient(ingredient)}>
                  &#128473;{" "}
                </span>
              </span>
            );
          })}
        </div>
      ) : recipeIngredients && !hero ? (
        <div ref={tagContainerRef} className={styles.tagcontainer}>
          {Array.from(recipeIngredients).map((ingredient, index) => {
            return (
              <span key={index} className={`${styles.tag} ${styles.post}`}>
                {ingredient.name}
                <span onClick={() => deleteIngredient(ingredient)}>
                  &#128473;{" "}
                </span>
              </span>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
