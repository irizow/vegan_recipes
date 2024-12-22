import styles from './recipecard.module.css';
import useFetch from '../../Hooks/useFetch';
import unknownImg from '../../assets/images/Recipes/unknownpicture.webp'

export default function RecipeCard({name, id, img}) {
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
        <div className={styles.recipeimg}>
            <img src={img ? img : unknownImg} alt={`${name} picture`}></img>
        </div>
        <h3>{name}</h3>
        <div className={styles.tagcontainer}>
            {matchedCategories ? matchedCategories.map((category, index) =>
            <span key={index}>{category.name}</span>) : ''}
        </div>
    </div>
    )
}