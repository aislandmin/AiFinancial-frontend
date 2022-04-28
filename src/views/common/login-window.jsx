// import { Link } from "react-router-dom";
import styles from "./login-window.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { setSessionUserInfo } from "./local-storage";
import emailKey from "./emailkey";
// import { init, send } from "emailjs-com";
import emailjs from "emailjs-com";
import { message, Button } from "antd";

export default function LoginWindow(props) {
  const [code, setCode] = useState(null);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("login"); //login, signup, forgetPassword, resetpassword
  const [newusername, setNewUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCodeSend, setVerifyCodeSend] = useState("");
  const [verifyCodeReceive, setVerifyCodeReceive] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    setLoginState("login");
    setMessageFromServer("");
  }, []);

  async function HandleSubmitClick() {
    const userData = {
      username,
      password,
    };
    console.log(userData);

    try {
      const resData = await axios({
        url: "/login",
        method: "POST",
        data: userData,
      });
      console.log("Get resData: ", resData);
      setMessageFromServer(resData?.data?.msg);
      setCode(resData?.data?.code);
      if (resData?.data?.code === 200) {
        // setCode(resData?.data?.code);
        setSessionUserInfo(username); // put username into local storage
        props.setCurUsername(username); // data to push header re-rendering
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/login", er);
    }
  }

  async function HandleSignupSubmitClick() {
    try {
      const resData = await axios({
        url: "/signup",
        method: "POST",
        data: {
          userData: {
            Name: newusername,
            Gender: gender,
            Email: email,
            "Phone Number": phoneNumber,
            Password: newpassword,
          },
        },
      });
      console.log("HandleSignupSubmitClick Get resData: ", resData);
      setMessageFromServer(resData?.data?.msg);
      setCode(resData?.data?.code);
      if (resData?.data?.code === 200) {
        setCode(resData?.data?.code);
        setSessionUserInfo(newusername); // put username into local storage
        props.setCurUsername(newusername); // data to push header re-rendering
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/signup", er);
    }
  }

  function handleInputChange(event) {
    setMessageFromServer("");
    console.log("handleInputChange:", event.target.name, event.target.value);
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "gender") {
      setGender(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "phoneNumber") {
      setPhoneNumber(event.target.value);
    } else if (event.target.name === "newusername") {
      setNewUsername(event.target.value);
    } else if (event.target.name === "newpassword") {
      setNewPassword(event.target.value);
    } else if (event.target.name === "verifyEmail") {
      setVerifyEmail(event.target.value);
    } else if (event.target.name === "verifyCodeReceive") {
      setVerifyCodeReceive(event.target.value);
    } else if (event.target.name === "firstPassword") {
      setFirstPassword(event.target.value);
    } else if (event.target.name === "secondPassword") {
      setSecondPassword(event.target.value);
    }
  }

  function handleLoginClick() {
    setLoginState("login");
    setMessageFromServer("");
  }

  function handleSignupClick() {
    setLoginState("signup");
    setMessageFromServer("");
  }

  function handleForgetPasswordClick() {
    setLoginState("forgetpassword");
    setMessageFromServer("");
  }

  async function HandleResetPasswordClick() {
    if (firstPassword !== secondPassword) {
      message.warning("Two passwords not match!");
      return;
    }
    try {
      const resData = await axios({
        url: "/resetpassword",
        method: "POST",
        data: {
          password: firstPassword,
          email: verifyEmail,
        },
      });
      console.log("HandleResetPasswordClick Get resData: ", resData);
      setMessageFromServer(resData?.data?.msg);
      setCode(resData?.data?.code);
      if (resData?.data?.code === 200) {
        message.success("Succeeded to reset password!");
        setLoginState("login");
        setMessageFromServer("");
        setUsername("");
        setPassword("");
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/resetpassword", er);
    }
  }

  function HandleSendVerifyCodeClick() {
    setVerifyCodeReceive("");
    const randomCode = String(Math.floor(100000 + Math.random() * 900000));
    setVerifyCodeSend(randomCode);

    const templateParams = {
      verification_code: randomCode,
      to_email: verifyEmail,
    };

    console.log("verifyEmail: ", verifyEmail);
    emailjs
      .send(
        emailKey.SERVICE_ID,
        emailKey.TEMPLATE_ID,
        templateParams,
        emailKey.USER_ID
      )
      .then(
        function (response) {
          console.log(
            "Succeeded to send Email! ",
            response.status,
            response.text
          );
          message.success("Succeeded to send Email!");
        },
        function (error) {
          console.log("FAILED to send Email...", error);
          message.error("Failed to send Email!");
        }
      );
  }

  function HandleVerifyClick() {
    console.log("HandleVerifyClick: ", verifyCodeSend, verifyCodeReceive);
    if (verifyCodeReceive === verifyCodeSend) {
      setLoginState("resetpassword");
    } else {
      message.warning("Verification Code Not Match!");
    }
  }

  const loginElement = (
    <div className="express-login-form-panel">
      <div className="express-login-form-panel-header">
        <div
          className="express-login-form-header-text"
          onClick={handleForgetPasswordClick}
        >
          Forget Password
        </div>
        <div
          className="express-login-form-header-text"
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Enter your username"
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Enter your password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>

      {code === 500 && (
        <p className="express-login-form-panel-warning">{messageFromServer}</p>
      )}
      <button
        className="express-login-form-panel-btn"
        onClick={HandleSubmitClick}
      >
        Login
      </button>
    </div>
  );

  const signupElement = (
    <div className="express-signup-form-panel">
      <div className="express-signup-form-panel-header">
        <div
          className="express-signup-form-header-text"
          onClick={handleForgetPasswordClick}
        >
          Forget Password
        </div>
        <div
          className="express-signup-form-header-text"
          onClick={handleLoginClick}
        >
          Log in
        </div>
      </div>

      <div className="express-signup-form-panel-input">
        <input
          placeholder="Name"
          type="text"
          name="newusername"
          value={newusername}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-signup-form-panel-input">
        <select name="gender" onChange={handleInputChange} value={gender}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      <div className="express-signup-form-panel-input">
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-signup-form-panel-input">
        <input
          placeholder="Phone number"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-signup-form-panel-input">
        <input
          placeholder="Password"
          type="newpassword"
          name="newpassword"
          value={newpassword}
          onChange={handleInputChange}
        />
      </div>
      {code === 500 && (
        <p className="express-signup-form-panel-warning">{messageFromServer}</p>
      )}
      <button
        className="express-signup-form-panel-btn"
        onClick={HandleSignupSubmitClick}
      >
        SIGN UP
      </button>
    </div>
  );

  const resetpasswordElement = (
    <div className="express-login-form-panel">
      <div className="express-login-form-panel-header">
        <div
          className="express-login-form-header-text"
          onClick={handleLoginClick}
        >
          Log in
        </div>
        <div
          className="express-login-form-header-text"
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Please enter your password"
          type="password"
          name="firstPassword"
          value={firstPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Please re-enter your password"
          type="password"
          name="secondPassword"
          value={secondPassword}
          onChange={handleInputChange}
        />
      </div>
      {messageFromServer !== "" && (
        <p className="express-login-form-panel-warning">{messageFromServer}</p>
      )}
      <div className="express-antdcenter-form-panel-btn">
        <Button
          type="primary"
          // className="express-login-form-panel-btn"
          onClick={HandleResetPasswordClick}
        >
          Reset Password
        </Button>{" "}
      </div>
    </div>
  );

  const forgetpasswordElement = (
    <div className="express-login-form-panel">
      <div className="express-login-form-panel-header">
        <div
          className="express-login-form-header-text"
          onClick={handleLoginClick}
        >
          Log in
        </div>
        <div
          className="express-login-form-header-text"
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Enter your Email"
          type="verifyEmail"
          name="verifyEmail"
          value={verifyEmail}
          onChange={handleInputChange}
        />
      </div>
      <div className="express-antdcenter-form-panel-btn">
        <Button
          type="primary"
          // className="express-ResetPassword-form-panel-btn"
          onClick={HandleSendVerifyCodeClick}
        >
          Send Verification Code
        </Button>
      </div>
      <div className="express-login-form-panel-input">
        <input
          placeholder="Please input Verification Code"
          type="text"
          name="verifyCodeReceive"
          value={verifyCodeReceive}
          onChange={handleInputChange}
        />
      </div>
      {messageFromServer !== "" && (
        <p className="express-login-form-panel-warning">{messageFromServer}</p>
      )}
      <div className="express-antdcenter-form-panel-btn">
        <Button
          type="primary"
          // className="express-resetpassword-form-panel-btn"
          onClick={HandleVerifyClick}
        >
          Verify
        </Button>
      </div>
    </div>
  );

  const element = (
    <div className={styles["express-login-window-container"]}>
      <div className="express-login-window">
        <img alt="" src="/login-bg.jpg" />
        <div className="express-login-form">
          <div className="express-login-form-company">
            <img alt="" src="/logo-without-glow.png" />
            <h4>AI Financial</h4>
          </div>
          {loginState === "login"
            ? loginElement
            : loginState === "signup"
            ? signupElement
            : loginState === "resetpassword"
            ? resetpasswordElement
            : forgetpasswordElement}
        </div>
      </div>
    </div>
  );

  return element;
}
