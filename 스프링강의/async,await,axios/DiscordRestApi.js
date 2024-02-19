import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export function DiscordRestApi() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  async function onLogin() {
    try {
      const response = await apiLoginByAxiosPost(loginId, password);
      if (response.data.resultCode === "SUCCESS") {
        console.log(response.data.data);
        setToken(response.data.data.token);
      }
    } catch (err) {
      console.log(err.response.data);
    }

    // const response = await apiLoginByFetch(loginId, password);
    // if (response.resultCode === "SUCCESS") {
    //   console.log(response.data);
    // } else {
    //   console.log(response.data);
    // }
  }

  function onLogout() {
    setToken(null);
    setLoginId("");
    setPassword("");
  }

  async function onMyInfo() {
    try {
      const response = await apiGetMyInfo();
      if (response.data.resultCode === "SUCCESS") {
        console.log(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", null);
    }
  }, [token]);

  return (
    <>
      {token ? (
        <>
          <h1>Welcome, {loginId}</h1>
          <p>
            <button onClick={onLogout}>Logout</button>
          </p>
          <p>
            <button onClick={onMyInfo}>My Info</button>
          </p>
        </>
      ) : (
        <>
          <h1>Hello, Discord~~</h1>
          <p>Login ID</p>
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            <button onClick={onLogin}>Login</button>
          </p>
        </>
      )}
    </>
  );
}

export function apiLoginByAxiosPost(loginId, password) {
  return axios.post(
    "http://localhost:8080/api/authenticate",
    {
      username: loginId,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function apiLoginByAxios(loginId, password) {
  return axios({
    method: "POST",
    url: "http://localhost:8080/api/authenticate",
    data: {
      username: loginId,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function apiLoginByFetch(loginId, password) {
  return fetch("http://localhost:8080/api/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginId,
      password: password,
    }),
  })
    .then((response) => response.json())
    .catch((err) => err);
}

export function apiGetMyInfo() {
  const token = sessionStorage.getItem("token");
  return axios.get("http://localhost:8080/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
