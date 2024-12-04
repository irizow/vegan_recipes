import styles from './recipedetail.module.css';

export default function RecipeDetail({name, instructions, kcal, time}) {
    return (
        <section className={styles.recipedetail}>
            <h1>{name}</h1>
            <ul>
            {instructions.map((instruction, index) => 
            <li key={index}>{instruction}</li>)}
            </ul>
            <p>kcal: {kcal}</p>
            <p>time: {time}</p>
        </section>
    )
}