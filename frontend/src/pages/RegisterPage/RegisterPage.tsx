import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../AuthPage.module.css";
import { register } from "../../services/authService";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setСonfirmedPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      register({ email, password });
    } else {
      console.log("неодинаковые пароли");
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles["auth-input"]}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className={styles["auth-input"]}
            type="password"
            value={confirmedPassword}
            onChange={(e) => setСonfirmedPassword(e.target.value)}
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />

          <button className={styles["auth-button"]} type="submit">
            Create
          </button>
        </form>
        <div className={styles["auth-footer"]}>
          <p>Already have an account?</p>
          <Link className={styles["auth-link"]} to={"/login"}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
