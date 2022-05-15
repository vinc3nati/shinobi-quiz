import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { TitleType } from "../../types";

export const Signup = ({ title }: TitleType) => {
  useDocumentTitle(title);
  const {
    userCredentials: { token },
    handleSignup,
  } = useAuth();
  const initialVal = {
    name: "",
    email: "",
    password: "",
  };
  const [signup, setSignup] = useState(initialVal);

  const location: any = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSignup(signup.name, signup.email, signup.password);
    setSignup(initialVal);
  };

  useEffect(() => {
    if (token) navigate(location?.state?.from || "/", { replace: true });
  }, [token]);

  return (
    <section id="auth">
      <header className="section-heading">Register</header>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-grp">
          <label htmlFor="username">Name</label>
          <input
            name="name"
            id="username"
            value={signup.name}
            onChange={handleChange}
            required
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="input-grp">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={signup.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="example@example.com"
          />
        </div>
        <div className="input-grp">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            value={signup.password}
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="btn primary">register</button>
      </form>
      <div className="sub-text text-center">
        Already have an account?{" "}
        <Link to="/login" state={{ from }} className="text-secondary">
          Log in!
        </Link>
      </div>
    </section>
  );
};
