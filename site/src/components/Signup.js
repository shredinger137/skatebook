import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'

const Signup = () => {

    const firebase = useFirebaseApp();

  // User State
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
  });

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

// Submit function (Create account)
const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up code here.
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.nickname,
        })
      }).catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange}/><br />
        <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
        <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
        <button type="submit">Sign Up</button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </>
  )
};

export default Signup;