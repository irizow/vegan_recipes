import styles from "./hero.module.css";
import Searchbar from "../../Components/Searchbar/Searchbar";
import { SearchIngredientsContext } from "../../utils/SearchedIngredientsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

export default function Hero({ setShowRecipes }) {
    const {searchedIngredients} = useContext(SearchIngredientsContext);
    const {user} = useContext(UserContext);
  

  return (
    <section className={styles.hero}>
      <h1>What's In Your Fridge?</h1>
        <Searchbar hero={true} />
        <Link to='/recipes'>
          <button className={styles.searchbutton}>LET'S COOK!</button>
        </Link>
    </section>
  );
}
