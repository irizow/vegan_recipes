import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchedIngredientsProvider } from "./utils/SearchedIngredientsContext.jsx";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Hero from "./Sections/Hero/Hero.jsx";
import Recipes from "./Sections/Recipes/Recipes.jsx";
import RecipeDetail from "./Sections/RecipeDetail/RecipeDetail.jsx";
import NewRecipe from "./Sections/NewRecipe/NewRecipe.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetail />,
      },
    ],
  },
  {
    path: "/add-recipe",
    element: <NewRecipe />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchedIngredientsProvider>
      <RouterProvider router={router} />
    </SearchedIngredientsProvider>
  </StrictMode>,
);
