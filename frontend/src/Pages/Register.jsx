import { useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  async function RegisterUser() {
    const data = {
      name, email, password
    }
    const response = await fetch(`https://mern-shopping-cart-payment.onrender.com/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      alert('Registration successful!');
    } else {
      const result = await response.json();
      alert(`Registration failed: ${result.message}`);
    }
  }
  return (
    <div >
      <h1>Register</h1>
      <div>
        <form onSubmit={RegisterUser}>
          <input
            id='input'
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          /><br />
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
                        value="Register"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5 border border-blue-500 focus:outline-none focus:border-blue-700"
                    />
        </form>
      </div>
      <p>Already Registered? <Link to='/login'>Login here</Link></p>

    </div>
  )
}

export default Register
