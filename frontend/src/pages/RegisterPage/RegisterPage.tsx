import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { register } from "../../services/authService";
import styles from "../AuthPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmedPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = await register({ email, password });

    if (result.status === "not-configured") {
      setMessage("Demo only: account registration is not connected yet.");
    }
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-card"]}>
        <h1 className={styles["auth-title"]}>Create An Account</h1>

        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <input
            className={styles["auth-input"]}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <input
            className={styles["auth-input"]}
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <input
            className={styles["auth-input"]}
            type="password"
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button className={styles["auth-button"]} type="submit">
            Create
          </button>

          {message && (
            <p className={styles["auth-message"]} role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        <div className={styles["auth-footer"]}>
          <p>Already have an account?</p>
          <Link className={styles["auth-link"]} to="/login">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
