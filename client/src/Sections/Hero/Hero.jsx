import styles from './hero.module.css';
import Searchbar from '../../Components/Searchbar/Searchbar';
import { SearchIngredientsContext } from '../../utils/SearchedIngredientsContext';
import { useContext } from 'react';

export default function Hero({setShowRecipes}) {
    

    const handleClick = ()=> {
        setShowRecipes(true);
    }

    return (
        <section className={styles.hero}>
            <button className={styles.loginbutton}>Log In</button>
            <h1>What's In Your Fridge?</h1>
            <Searchbar hero={true} />
            <button onClick={handleClick}>I'm hungry</button>
        </section>
    )
}