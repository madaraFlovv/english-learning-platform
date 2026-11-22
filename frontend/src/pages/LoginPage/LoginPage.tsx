import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { login } from "../../services/authService";
import styles from "../AuthPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const result = await login({ email, password });

    if (result.status === "not-configured") {
      setMessage("Demo only: login will be available after the backend is connected.");
    }
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-card"]}>
        <h1 className={styles["auth-title"]}>Log In to Your Account</h1>

        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <input
            className={styles["auth-input"]}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <input
            className={styles["auth-input"]}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />

          <button className={styles["auth-button"]} type="submit">
            Log In
          </button>

          {message && (
            <p className={styles["auth-message"]} role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        <div className={styles["auth-footer"]}>
          <p>Don't have an account?</p>
          <Link className={styles["auth-link"]} to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
