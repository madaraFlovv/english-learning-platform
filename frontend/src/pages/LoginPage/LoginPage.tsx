import { Link } from "react-router-dom";
import styles from "../AuthPage.module.css";
import styles from "../AuthPage.module.css";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-card"]}>
        <h1 className={styles["auth-title"]}>Log In to Your Account</h1>
        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <input
            className={styles["auth-input"]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className={styles["auth-input"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            required
          />
          <button className={styles["auth-button"]} type="submit">
            Log In
          </button>
        </form>
        <div className={styles["auth-footer"]}>
          <p>Don't have an account?</p>
          <Link className={styles["auth-link"]} to={"/register"}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
