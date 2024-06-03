import React, { useState, useEffect } from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

import './App.css';
import './newApp.css';
import Homepage from './homepage/Homepage';
import { hash } from 'bcryptjs';

function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('INTERN');

  const [loggedIn, setLoggedIn] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPasword] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('id');
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  
  const handlePageChange = (event) => {
    event.preventDefault();
    setSignUpPage(!signUpPage);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/api/createEmployee",  {
        'id': '',
        'name': name,
        'email': username,
        'password': CryptoJS.SHA256(password).toString(),
        'designation': role
      }
    ).then((response) => {
      alert("User Created, kindly login");
      window.location.reload();
    }).catch((error) => {
      alert("Cannot signup. Try signing up ith different account, " + error.message);
      window.location.reload();
    });
  };

  const loginSubmit = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/api/validate?email=" + email + "&password=" + CryptoJS.SHA256(loginPassword).toString())
    .then((response) => {
          localStorage.setItem("id", response.data);
          setLoggedIn(true);
      })
      .catch((error) => {
        alert("Email / Password is incorrect. " + error.message);
      });
  };

  return (
    loggedIn
      ? <Homepage />
      : signUpPage
        ? <div className="App">
          <header className="App-header">
            <div className="login-box">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className='myLabels'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="myLabels">
                  <label htmlFor="username">Email:</label>
                  <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="myLabels">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="myLabels">
                  <label htmlFor='role'>Designation:</label>
                  <select id="dropdown" value={role} onChange={handleRoleChange}>
                    <option value="INTERN">Intern</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                </div>
                <div className="">
                  <button type="submit">Sign Up</button>
                </div>
              </form>

              <p>Already have an account? <a href="#" onClick={handlePageChange}>Log in</a></p>
            </div>
          </header>
        </div>
        : <div className="App">
          <header className="App-header">
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={loginSubmit}>
                <div className="myLabels">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="myLabels">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPasword(e.target.value)}
                    required
                    />
                </div>
                <div className="">
                  <button type="submit">Login</button>
                </div>
              </form>
              <p>Don't have an account? <a href="#" onClick={handlePageChange}>Sign Up</a></p>
            </div>
          </header>
        </div>

  );
}

export default App;
