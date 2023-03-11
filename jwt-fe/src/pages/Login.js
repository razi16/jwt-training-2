import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { LoginContext } from "../layout/Main";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("x-access-token", res.data.token);
        loginContext.loginDispatch("login");
        navigate("/dashboard");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (token) {
      const headers = {
        token: token,
      };
      axios.get("http://localhost:4000/username", { headers }).then((res) => {
        if (res.data.isLoggedIn === true) {
          navigate("/dashboard");
        }
      });
    }
  }, []);

  return (
    <main>
      <div className="container-fluid">
        <h1 className="text-center">Login</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mr-2">
            Email:
          </label>
          <br />
          <input
            className="mb-3"
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password" className="mr-2">
            Password:
          </label>
          <br />
          <input
            className="mb-3"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
