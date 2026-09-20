import { Link } from "react-router-dom";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Log In to Your Account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            required
          />
          <button className="auth-button" type="submit">
            Log In
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link className="auth-link" to={"/register"}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
