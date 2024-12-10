import { createContext, useState } from "react";

export const SearchIngredientsContext = createContext();

export const SearchedIngredientsProvider = ({ children }) => {
  const [searchedIngredients, setSearchedIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <SearchIngredientsContext.Provider
      value={{
        searchedIngredients,
        setSearchedIngredients,
        recipeIngredients,
        setRecipeIngredients,
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {children}
    </SearchIngredientsContext.Provider>
  );
};
