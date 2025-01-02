import styles from './recipecard.module.css';
import useFetch from '../../Hooks/useFetch';
import unknownImg from '../../assets/images/Recipes/unknownpicture.webp'
import heartIcon from '../../assets/images/Icons/heart.svg'
import filledHeartIcon from '../../assets/images/Icons/filledheart.png'
import { UserContext } from '../../utils/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({name, id, img}) {
    const {user} = useContext(UserContext);
    const {data: recipeCategories} = useFetch('http://localhost:4000/api/categoryrecipes');
    const {data: categories} = useFetch('http://localhost:4000/api/categories');
    const [favorites, setFavorites] = useState([]);
    let matchedCategories = [];

    useEffect(()=> {
        if(user.id) {
            const fetchFavorites = async () => {
            const response = await fetch(`http://localhost:4000/api/favorites/${user.id}`);
            const data = await response.json();
            console.log('user', user)
            console.log('data', data)
            const favoriteIds = data.map((recipe) => recipe.id)
            setFavorites(favoriteIds);
            console.log('favorites', favorites)
        }
        fetchFavorites()
        }
    }, [user.id])


    if(recipeCategories && categories) {
        const filteredCategories = recipeCategories.filter((recipeCategory) => recipeCategory.recipe_id === id);
        const categoryIds = filteredCategories.map((recipeCategory) => recipeCategory.tag_id);
        matchedCategories = categories.filter((category) => categoryIds.includes(category.id));
    }
    
    const handleClick = async (e) => {
        e.stopPropagation()
        console.log('favorites', favorites)
        const isFavorite = favorites.includes(id)
        const method = isFavorite ? 'DELETE' : 'POST'
        const recipeData = {userId: user.id, recipeId: id}
        try {
            const response = await fetch('/api/favorites', {
                method: method,
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(recipeData)
            })
            if(!response.ok) {
                throw new Error('Error to add favorite')
            }
            if(isFavorite) {
                setFavorites(favorites.filter((favorite) => favorite !== id))
                alert('Favorite deleted from the list')
            } 
            else if(!isFavorite) {
                setFavorites([...favorites, id])
                alert('Favorite added to the list')
            }
        }
        catch(err) {
            console.log(err.message);
            alert('Error handling favorite');
        }
        finally {
            console.log('favorites', favorites)
        }
    }
    
    return (
    <div className={styles.recipecard}>
        <div className={styles.recipeimg}>
            <img src={img ? img : unknownImg} alt={`${name} picture`}></img>
        </div>
        <Link to={`/recipe/${id}`}>
            <h3>{name}</h3>
        </Link>
        {user.id && 
        <img 
            className={styles.hearticon} 
            src={favorites.includes(id) ? filledHeartIcon : heartIcon} 
            alt='heart icon'
            onClick={handleClick}></img>
        }
        <div className={styles.tagcontainer}>
            {matchedCategories ? matchedCategories.map((category, index) =>
            <span key={index}>{category.name}</span>) : ''}
        </div>
    </div>
    )
}