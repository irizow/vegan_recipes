
import styles from './registration.module.css'
import { useState } from 'react'

export default function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e)=> {
        e.preventDefault()

        if(username.length > 15 || username.length < 4) {
            return alert('The username must be between 4 and 15 characters long')
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/

        if(!passwordPattern.test(password)) {
            return alert('Password must be between 8 and 20 characters and include numbers, letters and special characters')
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!emailPattern.test(email)) {
            return alert('The email must be valid')
        }

        if(password !== confirmPassword) {
            return alert("The passwords don't match!")
        }


        setLoading(true);
        setError('');

        const userData = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await fetch("/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if(response.ok) {
                alert('User created successfully');
                window.location.href = '/log-in'
            }

            else {
                const data = await response.json()
                setError(data.message);
                alert(error)
            }
        } catch (error) {
            console.error('Error during registration', error);
            setError('Network error, please try again later.');
            alert(error);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <section className={styles.registration}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type='text' value={username} onChange={(e)=> {setUsername(e.target.value)}}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
                </div>
                <button type='submit'>Register</button>
             
            </form>
        </section>
    )
}