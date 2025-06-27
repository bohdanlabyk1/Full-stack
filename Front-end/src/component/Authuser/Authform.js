import React, { useState } from 'react';
import './authform.css';
import { loginUser, registerUser } from '../api/api';

const Authform = ({ setIsAuth, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [formdata, setFormdata] = useState({
    email: '',
    username: '',
    password: '',
    repitpssword: ''
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formdata.password !== formdata.repitpssword) {
      setMessage('Паролі не співпадають');
      return;
    }

    try {
      const result = isLogin
        ? await loginUser(formdata.email, formdata.password)
        : await registerUser(formdata.email, formdata.password, formdata.username);

      setMessage(result.message);

      if (result.status === 'success' && result.token) { // ✅ виправлено
        localStorage.setItem('token', result.token);
        setIsAuth(true);
        if (onSuccess) onSuccess(); // ✅ закриє модалку
      }

      setFormdata({
        email: '',
        username: '',
        password: '',
        repitpssword: ''
      });
    } catch (error) {
      setMessage('Помилка запиту');
    }
  };

  return (
    <div className={`container ${isLogin ? '' : 'sign-up-mode'}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Login" className="btn" />
          </form>

          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Registration</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formdata.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="repitpssword"
              placeholder="Repeat Password"
              value={formdata.repitpssword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Hello, Welcome!</h3>
            <p>Don't have an account?</p>
            <button className="btn transparent" onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>Already have an account?</p>
            <button className="btn transparent" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </div>
        </div>
      </div>

      {message && <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Authform;
