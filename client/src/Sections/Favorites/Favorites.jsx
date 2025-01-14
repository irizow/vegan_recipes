import styles from './favorites.module.css'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../utils/UserContext';
import { useContext } from 'react';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';

export default function Favorites() {
    const {user} = useContext(UserContext)
    const {data: favorites, isLoading, error} = useFetch(`http://localhost:4000/api/favorites/${user.id}`)
    if(isLoading) return <p>...Loading</p>
    if(error) return <p>{error}</p>
    if(favorites.length === 0) return <p>You don't have any favorites yet</p>
    else {
    console.log(favorites) 
    return (
        <section className={styles.favorites}>
            <h2>{user.username}'s Favorites</h2>
            <div className={styles.favoriteswrapper}>
            {favorites.map((favorite) => {
                return (
                <RecipeCard name={favorite.name} id={favorite.id}>
                </RecipeCard>
                )
            })}
            </div>
        </section>
    )
    }
}