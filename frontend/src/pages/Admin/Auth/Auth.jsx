import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "./components/images/logo.png";

import Input from "../../../components/FormElements/Input/Input";
import useInput from "../../../hooks/use-input";
import { authActions } from "../../../store/auth-slice";

import classes from "./components/Auth.module.css";
import Button from "../../../components/FormElements/Button/Button";

const Auth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNotEmpty = (value) => value.trim().length > 5;
  const isEmail = (value) => value.includes("@");

  const {
    value: email,
    valueChangeHandler: emailChangeHandler,
    isValid: emailIsValid,
  } = useInput(isEmail, "");

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    isValid: passwordIsValid,
  } = useInput(isNotEmpty, "");

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const login = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        if (!response.ok) {
          setIsLoading(false);
          const error = await response.json();
          throw new Error(error.message);
        }

        navigate("/admin", { replace: true });

        const data = await response.json();
        const { token, userId } = data;
        const expiration = new Date();
        // expiration.setSeconds(expiration.getSeconds() + 30);
        expiration.setFullYear(expiration.getFullYear() + 1);

        const adminData = {
          token,
          expiration,
          userId,
        };

        localStorage.setItem("adminData", JSON.stringify(adminData));

        dispatch(authActions.login({ token, userId }));
      } catch (error) {
        setError(error.message);
      }
    };

    login();
  };

  return (
    <main className={classes.container}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className={classes.auth_cont}>
        {error && <p>{error}</p>}
        <h1 className={classes.h1}>Log In</h1>
        <form onSubmit={formSubmitHandler}>
          <Input
            element="input"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            className={classes.input}
          />
          <Input
            element="input"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            className={classes.input}
          />
          <Button disabled={!formIsValid || isLoading} type="submit">
            LOG IN
          </Button>
        </form>
        {!forgot && (
          <p onClick={() => setForgot(true)} className={classes.p1}>
            LOST YOUR PASSWORD?
          </p>
        )}
        {forgot && (
          <p className={classes.p2}>
            Kindly contact <a href="mailto:dev@dazzleberry.com">admin</a>
          </p>
        )}
      </div>
    </main>
  );
};

export default Auth;
