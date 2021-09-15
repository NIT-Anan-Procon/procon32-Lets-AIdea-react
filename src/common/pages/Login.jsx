import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Login.css";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [attentionMessageToUserName, setAttentionMessageToUserName] =
    useState("");
  const [attentionMessageToPassword, setAttentionMessageToPassword] =
    useState("");
  const history = useHistory();
  const params = new FormData();

  useEffect(() => {
    axios
      .get(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/User/CheckLogin.php",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Cookieがあるよ");
        console.log(res.status);
        history.push("/selection");
      })
      .catch((error) => {
        console.log("Cookieがないよ");
        console.log(error.request.status);
      });
  }, []);

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("新規登録ユーザー名を入力してください");
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("新規登録パスワードを入力してください");
    } else {
      event.preventDefault();
      console.log("--- 新規登録 ---");
      console.log("ユーザーネーム: " + userName);
      console.log("パスワード: " + password);
      params.append("name", userName);
      params.append("password", password);
      axios
        .post("http://localhost/API/User/CreateUser.php", params, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log("レスポンス: " + result.status);
          params.delete("name");
          params.delete("password");
        })
        .catch((error) => {
          console.log("レスポンス: " + error.request.status);
        });
    }
  };

  const loginHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("ログインユーザー名を入力してください");
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("ログインパスワードを入力してください");
    } else {
      event.preventDefault();
      console.log("--- Login ---");
      console.log("ユーザーネーム: " + userName);
      console.log("パスワード: " + password);
      params.append("name", userName);
      params.append("password", password);
      axios
        .post(
          "http://localhost/~kubota/procon32_Lets_AIdea_php/API/User/Login.php",
          params,
          {
            withCredentials: true,
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((result) => {
          console.log("レスポンス: " + result.status);
          params.delete("name");
          params.delete("password");
        })
        .catch((error) => {
          console.log("レスポンス: " + error.request.status);
        });
    }
    history.push("/selection");
  };

  const GetUserInfoHandle = () => {
    axios
      .get(
        "http://localhost/~kubota/procon32_Lets_AIdea_php/API/User/GetUserInfo.php",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("--- GetUserInfo ---");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  };

  return (
    <div id="login">
      <div className="logo">Let&apos;s AIdea !</div>
      <form id="loginForm">
        <input
          type="text"
          value={userName}
          placeholder="ユーザー名"
          onChange={userNameChange}
          id="inputUserName"
        />
        <input
          type="password"
          value={password}
          placeholder="パスワード"
          onChange={passwordChange}
          id="inputPassword"
        />
        <input
          type="submit"
          id="loginButton"
          value="ログイン"
          onClick={loginHandleSubmit}
        />
        <input
          type="submit"
          id="registerButton"
          value="新規登録"
          onClick={registerHandleSubmit}
        />
      </form>
      <p className="attentionMessageUserName">{attentionMessageToUserName}</p>
      <p className="attentionMessagePassword">{attentionMessageToPassword}</p>
      <button onClick={GetUserInfoHandle}>GetUserInfo</button>
    </div>
  );
}