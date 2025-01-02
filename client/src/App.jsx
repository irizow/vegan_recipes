import "./App.css";
import { useState } from "react";
import Hero from "./Sections/Hero/Hero";
import Recipes from "./Sections/Recipes/Recipes";
import { Outlet } from "react-router-dom";
import Header from "./Sections/Header/Header.jsx";

function App() {
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    
      <>
      <Header/>
        <Outlet />
      </>
  );
}

export default App;
