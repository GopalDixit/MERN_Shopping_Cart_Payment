import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/home');
        }
    }, [navigate]);

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            password
        };
        try {
            const response = await fetch(`https://mern-shopping-cart-payment.onrender.com/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            const result = await response.json();
            console.log("Token is", result.Token);
            if (result.Token) {
                // console.log('user is',user,' ans Token is',Token);
                // localStorage.setItem('user', JSON.stringify(result.User));
                localStorage.setItem('token', result.Token);
                navigate('/home', { state: { username: result.User.name } });
            } else {
                alert(`Login failed: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in.');
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleLogin}>
                    <input
                        id='input'
                        type='email'
                        value={email}
                        placeholder='E-mail'
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        id='input'
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <input
                        type="submit"
                        value="Login"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5 border border-blue-500 focus:outline-none focus:border-blue-700"
                    />

                </form>
            </div>
            <p>Don't have an account? <Link to='/register'>Register here</Link></p>
        </div>
    );
}

export default Login;
