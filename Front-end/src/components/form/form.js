import React, { useState } from "react";
import "./form.scss";
import { loginUser, registerUser } from "./../../api/api"; // Імпорт API-запитів

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валідація паролів при реєстрації
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage("Паролі не співпадають!");
      return;
    }

    try {
      const result = isLogin
        ? await loginUser(formData.email, formData.password)
        : await registerUser(formData.username, formData.email, formData.password);

      setMessage(result.message);

      // Якщо успішно, переходимо на URL, який повернув сервер
      if (result.status === "success" && result.redirect_url) {
        window.location.href = result.redirect_url;
      }

      // Очищення полів форми
      setFormData({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage("Щось пішло не так! " + error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(""); // Очистка повідомлення при перемиканні форми
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <h2>{isLogin ? "Увійти" : "Реєстрація"}</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        {!isLogin && (
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ім'я"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              autoComplete="username"
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword">Repit password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repit password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
        )}
        <button type="submit">{isLogin ? "Увійти" : "Реєстрація"}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={toggleForm}>
        {isLogin ? "Зареєструватися" : "Авторизація"}
      </button>
    </div>
  );
};

export default AuthForm;
