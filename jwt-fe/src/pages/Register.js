import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [takenEmail, setTakenEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTakenEmail(null);
    axios
      .post("http://localhost:4000/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message === "Email has already been taken") {
          setTakenEmail(true);
        } else {
          setTakenEmail(false);
        }
      });
  };

  return (
    <main>
      <div className="container-fluid">
        <h1 className="text-center">Register</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name" className="pr-5">
            Name:
          </label>
          <br />
          <input
            className="mb-3"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
            Register
          </button>
        </form>
        {takenEmail === null ? (
          <div></div>
        ) : takenEmail === true ? (
          <div className="alert alert-danger d-inline-block mt-3" role="alert">
            Email has already been taken
          </div>
        ) : (
          <div className="alert alert-success d-inline-block mt-3" role="alert">
            Your account has been created
          </div>
        )}
      </div>
    </main>
  );
}

export default Register;
