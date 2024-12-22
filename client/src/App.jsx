import "./App.css";
import { useState } from "react";
import { SearchedIngredientsProvider } from "./utils/SearchedIngredientsContext.jsx";
import Hero from "./Sections/Hero/Hero";
import Recipes from "./Sections/Recipes/Recipes";
import { Outlet } from "react-router-dom";

function App() {
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <SearchedIngredientsProvider>
      {!showRecipes && <Hero setShowRecipes={setShowRecipes} />}
      {showRecipes && <Recipes />}
      <Outlet />
    </SearchedIngredientsProvider>
  );
}

export default App;
