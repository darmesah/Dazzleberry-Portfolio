import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../../../components/FormElements/Input/Input";
import useInput from "../../../hooks/use-input";
import { authActions } from "../../../store/auth-slice";

const Auth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: name,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
  } = useInput(isNotEmpty, "");

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    isValid: passwordIsValid,
  } = useInput(isNotEmpty, "");

  let formIsValid = false;

  if (nameIsValid && passwordIsValid) {
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
              name,
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
        const { token } = data;
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);

        const adminData = {
          token,
          expiration,
        };

        localStorage.setItem("adminData", JSON.stringify(adminData));

        // dispatch(authActions.login(token));
      } catch (error) {
        setError(error.message);
      }
    };

    login();
  };

  return (
    <main>
      {error && <p>{error}</p>}
      <h1>Admin Auth</h1>
      <form onSubmit={formSubmitHandler}>
        <Input
          element="input"
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={nameChangeHandler}
        />
        <Input
          element="input"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button disabled={!formIsValid || isLoading} type="submit">
          Login
        </button>
      </form>
    </main>
  );
};

export default Auth;
