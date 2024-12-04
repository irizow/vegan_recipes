import styles from './recipecard.module.css';

export default function RecipeCard({name, key}) {
    return (
    <div className={styles.recipecard}>
        <div className={styles.recipeimg}></div>
        <h2>{name}</h2>
        <div className={styles.tagcontainer}>
            <span>asian</span>
            <span>healthy</span>
        </div>
    </div>
    )
}