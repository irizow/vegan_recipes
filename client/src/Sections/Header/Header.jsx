import styles from './header.module.css'
import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import heartIcon from '../../assets/images/Icons/heart.svg'
import homeIcon from '../../assets/images/Icons/home.svg'
import { Link } from 'react-router-dom'

export default function Header() {
    const {user, setUser} = useContext(UserContext)
    
    return (
        <header>
            <Link to='/'>
                <img src={homeIcon} alt='home icon'></img>
            </Link>
        {!user.username &&  
              <div className={styles.buttonbox}>
                <Link to="/add-recipe">Add Recipe</Link>
                <Link to='/log-in'>Log In</Link>
              </div>
        }
        {user.username &&
            <div className={styles.userbox}>
                <Link to={`/favorites/${user.id}`}>
                    <img src={heartIcon} alt='heart icon'></img>
                </Link>
                <button>{user.username}</button>
                <button id={styles.logoutbutton} 
                onClick={()=> {
                    setUser(null)
                }}>Logout</button>
            </div>
        
        }
        </header>
    )
}