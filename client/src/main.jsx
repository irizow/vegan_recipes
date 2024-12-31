import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchedIngredientsProvider } from "./utils/SearchedIngredientsContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Recipes from "./Sections/Recipes/Recipes.jsx";
import RecipeDetail from "./Sections/RecipeDetail/RecipeDetail.jsx";
import NewRecipe from "./Sections/NewRecipe/NewRecipe.jsx";
import LogIn from "./Sections/Login/Login.jsx";
import Registration from "./Sections/Registration/Registration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recipes",
        element: <Recipes />,
      },
    ],
  },
  {
    path: "/recipe/:id",
    element: <RecipeDetail />,
  },
  {
    path: "/add-recipe",
    element: <NewRecipe />,
  },
  {
    path: "/log-in",
    element: <LogIn />
  },
  {
    path: "/register",
    element: <Registration />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchedIngredientsProvider>
      <RouterProvider router={router} />
    </SearchedIngredientsProvider>
  </StrictMode>,
);
