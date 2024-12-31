import styles from './login.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className={styles.login}>
            <form>
                <div>
                    <label>Username:</label>
                    <input type='text'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password'></input>                    
                </div>
                <button type='button'>Log In</button>
                <div>
                    <span>Don't have an account yet?</span>
                    <Link to='/register' type='button'>Register</Link>
                </div>
            </form>
        </section>
    )
}