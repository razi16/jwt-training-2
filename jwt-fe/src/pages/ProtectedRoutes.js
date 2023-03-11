import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import Login from "./Login";

function ProtectedRoutes() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    //const parsedToken = JSON.parse(token);
    const headers = {
      token: token,
    };

    axios.get("http://localhost:4000/username", { headers }).then((res) => {
      if (res.data.isLoggedIn === true) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []);

  return auth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
