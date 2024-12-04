import './App.css'
import { useState, useContext } from 'react';
import { SearchedIngredientsProvider } from './utils/SearchedIngredientsContext.jsx';
import { SearchIngredientsContext } from './utils/SearchedIngredientsContext.jsx';
import Hero from './Sections/Hero/Hero';
import Recipes from './Sections/Recipes/Recipes';
import NewRecipe from './Sections/NewRecipe/NewRecipe.jsx';

function App() {

  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <SearchedIngredientsProvider>
    {!showRecipes &&
    <Hero setShowRecipes={setShowRecipes} />
    }
    {showRecipes &&
      <Recipes />
    }
    <NewRecipe/>
    </SearchedIngredientsProvider>
  )
}

export default App