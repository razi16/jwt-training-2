import React, { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import Register from "../pages/Register";
import Navbar from "./Navbar";

export const LoginContext = React.createContext();

const initialState = false;

const reducer = (state, action) => {
  switch (action) {
    case "login":
      return true;
    case "logout":
      return false;
    default:
      return state;
  }
};

function Main() {
  const [login, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loginState: login, loginDispatch: dispatch }}
      >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </LoginContext.Provider>

      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
