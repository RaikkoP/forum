import React, { useEffect, useState, useRef } from "react";
import "./LogIn.css";
import "./LogInAnimation.css";
import Logo from "../Images/logo.png";
import axios from "axios";
import { USER_REGEX, PASSWORD_REGEX } from "../REGEX/Regex";
import bcrypt from "bcryptjs";

const LogIn = (props) => {
  //UseStates and useEffects
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [loginType, setLoginType] = useState("Login");
  const [error, setError] = useState("");

  //Registration Handling
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  //Backend
  const handleLogin = (event) => {
    axios
      .post("/login", { username, password })
      .then((res) => {
        if (
          res.data[0].Username === username
        ) {
          props.status(true);
          console.log(res.data[0]);
          props.username(username);
          props.password(password);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          setError(
            "Please check if the username is correct, or register an account below"
          );
        } else if (err.response.status === 410) {
          setError("Wrong password");
        } else {
          setError("Login failed");
        }
      });
    setUsername("");
    setPassword("");
    setError("");
    event.preventDefault();
  };

  const handleRegister = (event) => {
    console.log(username);
    console.log(password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);
    axios
      .post("/register", { username, password, hashedPassword })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          setError("Password does not meet the requirements");
        } else if (err.response.status === 405) {
          setError("Username does not meet the requirements");
        } else if (err.response.status === 409) { 
          setError("Username already exists");
        } 
        else {
          setError("Problem with registration");
        }
      });
    setUsername("");
    setPassword("");
    setMatchPassword("");
    setError("");
    event.preventDefault();
  };

  return (
    <div className="LogIn-box">
      <div className="float-left">
        <div className="input-fields">
          <h1>Welcome!</h1>
          {loginType === "Login" && (
            <div>
              <form>
                <label for="username">Username:</label>
                <input
                  ref={userRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  name="username"
                ></input>
                <label for="password">Password:</label>
                <input
                  ref={userRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                ></input>
                <button onClick={handleLogin}>Log-in</button>
                <button onClick={() => setLoginType("Register")}>
                  Register
                </button>
                <br></br>
                <button>Continue as Guest</button>
              </form>
              <p>{error}</p>
            </div>
          )}
          {loginType === "Register" && (
            <div>
              <form>
                <label
                  htmlFor="username"
                  className={
                    userFocus && username && validUsername
                      ? "correct-input"
                      : ""
                  }
                >
                  Username:
                </label>
                <input
                  type="text"
                  value={username}
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                ></input>
                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validUsername
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  4 to 24 characters.<br></br>
                  Must being with a letter.<br></br>
                  Letters, numbers, undserscores, hyphens allowed.
                </p>
                <label
                  htmlFor="password"
                  className={
                    passwordFocus && password && validPassword
                      ? "correct-input"
                      : ""
                  }
                >
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                ></input>
                <p
                  id="pwdnote"
                  className={
                    passwordFocus && password && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  8 to 24 characters.<br></br>
                  Must include uppercase and lowercase letters, a number and a
                  special character.<br></br>
                  Allowed special character:{" "}
                  <span arial-labe="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hastag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span arial-label="precent"></span>
                </p>
                <label
                  htmlFor="confirmPassword"
                  className={
                    matchFocus && matchPassword && validMatch
                      ? "correct-input"
                      : ""
                  }
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                ></input>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  Must match the first password input field.
                </p>
                <p>{error}</p>
                <button
                  onClick={handleRegister}
                  disabled={
                    !validUsername || !validPassword || !validMatch
                      ? true
                      : false
                  }
                >
                  Sign up
                </button>
                <button onClick={() => setLoginType("Login")}>
                  Back to Login
                </button>
                <p ref={errRef} arial-live="assertive">
                  {error}
                </p>
                <br></br>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="float-right">
        <img className="logo" src={Logo} alt="logo"></img>
      </div>
    </div>
  );
};

export default LogIn;
