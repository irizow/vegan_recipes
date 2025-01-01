import styles from './login.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault();

        setLoading(true);
        setError('');

        const userData = {
            username: username,
            password: password
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if(response.ok) {
                alert('Log In successful')
            }
            else {
                const data = await response.json();
                setError(data.message)
                alert(error)
            }

        }
        catch(err) {
            console.error('Error during log-in', error);
            setError(err.message)
            alert(error)
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <section className={styles.login}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type='text' 
                        value={username} 
                        onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}}></input>                    
                </div>
                <button type='submit'>Log In</button>
                <div>
                    <span>Don't have an account yet?</span>
                    <Link to='/register' type='button'>Register</Link>
                </div>
            </form>
        </section>
    )
}