import React, { useState } from 'react';
import { useFirebaseApp, AuthCheck, useAuth } from 'reactfire';
import 'firebase/auth'
import {Link} from 'react-router-dom'
import firebase from 'firebase';
import googleLogo from '../images/btn_google_signin_dark_normal_web.png';



const Login = () => {
  // User State
  const [user, setUser] = useState({
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

  // Import firebase
  //const firebase = useFirebaseApp();

  const auth = firebase.auth();
  const reactAuth = useAuth()
  const signIn = async () => {
    await reactAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };


  // Submit function (Log in user)
  const handleSubmit = e => {
    e.preventDefault();
    // Log in code here.

    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(response => {
      //console.log(response)
    })
      .catch(error => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

  return (
    <>
      <div style={{ margin: "0, auto", paddingTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="width-25 w-50-md width-100-small" style={{ padding: "4px" }}>
            <h3 className="title center">Log In</h3>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label" htmlFor="email">
                  Email Address
        </label>
                <input type="text" placeholder="yourname@trexa.me" name="email" onChange={handleChange} className="width-100 px-3 py-2 form-input-shadow" required />
              </div>
              <div className="mb-4">
                <label className="form-label text-center" htmlFor="password">
                  Password
        </label>
                <input type="password" placeholder="******************" name="password" onChange={handleChange} className="width-100 px-3 py-2 form-input-shadow" required /><br />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-75 submit-button-round-blue"
                  type="submit"
                >
                  Log In
        </button>
        <img src={googleLogo} onClick={signIn} />
              </div>
              <hr className="mb-6 border-t" />
              {user.error && <h4>{user.error}</h4>}
              <div className="text-center">
                <Link to="/signup">
                  <span
                    className="link-text-secondary"
                  >
                    No account? Create one here.
        </span>
                </Link>
              </div>
              <div className="text-center">
                <Link to="/resetpassword"><span className="link-text-secondary">Reset Password</span></Link>
              </div>

            </form>
          </div>

        </div>

      </div>

    </>


  )
};

export default Login;