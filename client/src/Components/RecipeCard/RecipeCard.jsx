import styles from './recipecard.module.css';
import useFetch from '../../Hooks/useFetch';

export default function RecipeCard({name, id}) {
    const {data: recipeCategories} = useFetch('http://localhost:4000/categoryrecipes');
    const {data: categories} = useFetch('http://localhost:4000/categories');
    let matchedCategories = [];
    if(recipeCategories && categories) {
        const filteredCategories = recipeCategories.filter((recipeCategory) => recipeCategory.recipe_id === id);
        const categoryIds = filteredCategories.map((recipeCategory) => recipeCategory.tag_id);
        matchedCategories = categories.filter((category) => categoryIds.includes(category.id));
        console.log('categoryIds, ', categoryIds);
        console.log('matchedCateg ', matchedCategories);
    }
    return (
    <div className={styles.recipecard}>
        <div className={styles.recipeimg}></div>
        <h2>{name}</h2>
        <div className={styles.tagcontainer}>
            {matchedCategories ? matchedCategories.map((category, index) =>
            <span key={index}>{category.name}</span>) : ''}
        </div>
    </div>
    )
}