import styles from "./recipedetail.module.css";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const {
    data: recipe,
    isLoading,
    error,
  } = useFetch(`http://localhost:4000/recipe/${id}`);
  console.log(recipe);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.recipedetail}>
      <h1>{recipe[0].name}</h1>
      <ol>
        {recipe[0].instructions.map((instruction) => (
          <li>{instruction}</li>
        ))}
      </ol>
      {recipe[0].kcal && <p>kcal: {recipe[0].kcal}</p>}

      {recipe[0].time && <p>kcal: {recipe[0].time}</p>}
    </section>
  );
}
