import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("user");

  const test = (x) => {
    console.log(x);
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    const headers = {
      token: token,
    };

    axios.get("http://localhost:4000/username", { headers }).then((res) => {
      setName(res.data.name);
    });
  }, []);

  return (
    <main>
      <div className="container-fluid">
        <h1 className="text-center">Dashboard</h1>
        <p className="text-center">Welcome {name}</p>
        <button
          className="btn btn-default"
          onClick={() => {
            test("sdsd");
          }}
        >
          test
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
