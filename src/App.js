import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import './App.css';
import './newApp.css';
import Homepage from './homepage/Homepage';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate authentication
    if (username === 'user' && password === 'password') {
      sessionStorage.setItem('user', username);
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handlePageChange = (event) => {
    event.preventDefault();
    setSignUpPage(!signUpPage);
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
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit">Login</button>
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
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
