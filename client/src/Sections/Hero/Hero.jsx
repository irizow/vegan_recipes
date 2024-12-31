import styles from "./hero.module.css";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Hero({ setShowRecipes }) {
    const {searchedIngredients} = useContext(SearchIngredientsContext);
  const handleClick = () => {
    searchedIngredients.length > 0 ? setShowRecipes(true) : alert('You need to search for at least one ingredient!');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.buttonbox}>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to='/log-in'>Log In</Link>
      </div>
      <h1>What's In Your Fridge?</h1>
        <Searchbar hero={true} />
      <button className={styles.searchbutton} onClick={handleClick}>LET'S COOK!</button>
    </section>
  );
}
