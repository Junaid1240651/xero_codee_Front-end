import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SetPassword from "./createPassword";
import XeroLogo from "../images/xerologo.png";
import SignUpLogo from "../images/signup.png";
import SignUpLogo2 from "../images/signup2.png";
import Hello from "../images/Hello.png";
import Github from "../images/github.png";
import "../css/LoginAndSignup.css";
import LoadingScreen from "./LoadingScreen";
import handleGoogleLogin from "../userAuth/googleAuth";
import SignUpAuth from "../userAuth/signUpAuth";
import LoginAuth from "../userAuth/loginAuth";
import CreatePassword from "../userAuth/createPasswordAuth";
const clientId = process.env.REACT_APP_CLIENT_ID;
const googleClientId = process.env.REACT_APP_GOOGLE_CLIEND_ID;

const LoginAndSignup = ({ onAuthentication }) => {
  const [render, setRender] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const loginhandler = () => {
    setIsNewUser(false);
  };
  const signUphandler = () => {
    setIsNewUser(false);
  };

  useEffect(() => {
    setPath(window.location.pathname);
  }, [loginhandler, signUphandler]);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Call the signUpAuth function with the necessary parameters
   
    SignUpAuth(
      formData,
      onAuthentication,
      setLoadingScreen,
      navigate,
      setIsNewUser
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Call the loginAuth function with the necessary parameters
    LoginAuth(formData, onAuthentication, setLoadingScreen, navigate);
  };

  const handlePasswordSet = async (password) => {
    // Call the createPasswordAuth function with the necessary parameters
    CreatePassword(
      password,
      onAuthentication,
      navigate,
      setIsNewUser,
      setLoadingScreen
    );
  };

  const handleGoogleLoginAuth = (credentialResponse) => {
    handleGoogleLogin(
      credentialResponse,
      setIsNewUser,
      onAuthentication,
      navigate
    );
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (code && localStorage.getItem("access_token") === null) {
      async function getAccessToken() {
        await fetch(
          "https://xero-codee-backend.onrender.com/getAccessToken?code=" + code,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("access_token", data.access_token);
            setRender(!render);
            getGitUserData();
          });
      }
      getAccessToken();
    }
  }, []);

  const githubAuthHandler = () => {
    setIsNewUser(false);
    localStorage.clear();
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user,user:email`
    );
  };

  async function getGitUserData() {
    try {
      const response = await fetch(
        "https://xero-codee-backend.onrender.com/getUserData",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data.userData));
        onAuthentication();
        navigate("/choose");
      } else if (response.status === 201) {
        console.log(201);
        const data = await response.json();

        localStorage.setItem("userDetails", JSON.stringify(data.userData));
        setIsNewUser(true);
        console.log(response.data);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userData)
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <>
      {!loadingScreen ? (
        <div className="login-signup-container">
          <div className="header">
            <div className="header-contant">
              <div className="logo">
                <img src={XeroLogo} alt="Xero Logo" />
                <img src={Hello} alt="Hello" />
                <div className="header-text">
                  <div className="divider-div"></div>
                  <p>
                    {isNewUser
                      ? "Complete SignUp Process"
                      : path === "/signup"
                      ? "Create Your Account"
                      : "Login to Your Account"}
                  </p>
                  <div className="divider-div"></div>
                </div>
              </div>
              {path === "/signup" ? (
                isNewUser ? (
                  <SetPassword
                    onPasswordSet={(password) => handlePasswordSet(password)}
                  />
                ) : (
                  <form
                    onSubmit={handleSignUpSubmit}
                    action="/signup"
                    method="post"
                  >
                    <input placeholder="First Name" name="firstName" required />
                    <input placeholder="Last Name" name="lastName" required />
                    <input placeholder="Email Id" name="email" required />
                    <input placeholder="Password" name="password" required />
                    <input
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      required
                    />
                    <button className="login-button" type="submit">
                      SIGN UP
                    </button>
                  </form>
                )
              ) : isNewUser ? (
                <SetPassword
                  onPasswordSet={(password) => handlePasswordSet(password)}
                />
              ) : (
                <form
                  onSubmit={handleLoginSubmit}
                  action="/login"
                  method="post"
                >
                  <input placeholder="Email Id" name="email" required />
                  <input placeholder="Password" name="password" required />
                  <button className="login-button" type="submit">
                    Login
                  </button>
                </form>
              )}
              <p className="or-divider">OR</p>
              <div className="oauth-providers">
                <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLogin
                    // onClick={setIsNewUser(false)}
                    onSuccess={handleGoogleLoginAuth}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    text={path === "/signup" ? "signup_with" : "signin_with"}
                  />
                </GoogleOAuthProvider>
                <button onClick={githubAuthHandler}>
                  {path === "/signup"
                    ? "Sign Up With Github"
                    : "Sign In With Github"}
                  <img src={Github} alt="Github" />
                </button>
              </div>

              {path === "/signup" ? (
                <p className="switch-action">
                  Already Have an Account?
                  <Link
                    className="link-text-primary"
                    onClick={signUphandler}
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              ) : (
                <p className="switch-action">
                  {" "}
                  Don’t have an Account ?
                  <Link
                    className="link-text-primary"
                    onClick={loginhandler}
                    to="/signup"
                  >
                    SIGN UP
                  </Link>
                </p>
              )}
            </div>
            <hr />
            <div className="rightDiv-image">
              <img src={SignUpLogo} alt="SignUp Logo" />
              <div>
                <img src={SignUpLogo2} alt="SignUp Logo 2" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default LoginAndSignup;
