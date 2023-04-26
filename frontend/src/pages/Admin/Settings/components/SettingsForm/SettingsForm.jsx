import { useParams } from "react-router-dom";
import Button from "../../../../../components/FormElements/Button/Button";
import Input from "../../../../../components/FormElements/Input/Input";
import useInput from "../../../../../hooks/use-input";

import classes from "./SettingsForm.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const SettingsForm = ({ items }) => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [successMsg1, setSuccessMsg1] = useState("");
  const [successMsg2, setSuccessMsg2] = useState("");

  const { name, personal_email, work_email } = items;

  const { userId } = useParams();

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isStrong = (value) =>
    value.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
    );

  const {
    value: inputName,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
  } = useInput(isNotEmpty, name);

  const {
    value: wEmail,
    valueChangeHandler: wEmailChangeHandler,
    inputBlurHandler: wEmailBlurHandler,
    isValid: wEmailIsValid,
    hasError: wEmailHasError,
  } = useInput(isEmail, work_email);

  const {
    value: pEmail,
    valueChangeHandler: pEmailChangeHandler,
    inputBlurHandler: pEmailBlurHandler,
    isValid: pEmailIsValid,
    hasError: pEmailHasError,
  } = useInput(isEmail, personal_email);

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    reset: passwordReset,
  } = useInput(isStrong, "");

  let form1IsValid = false;
  let form2IsValid = false;

  if (nameIsValid && wEmailIsValid && pEmailIsValid) {
    form1IsValid = true;
  }

  if (passwordIsValid) {
    form2IsValid = true;
  }

  const token = useSelector((state) => state.auth.token);

  const form1SubmitHandler = (e) => {
    e.preventDefault();

    const postData = {
      name: inputName,
      work_email: wEmail,
      personal_email: pEmail,
    };

    const updateInfo = async () => {
      try {
        setIsLoading1(true);
        setSuccessMsg1("");
        setError1("");

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/info/${userId}`,
          {
            method: "PATCH",
            body: JSON.stringify(postData),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSuccessMsg1(data.message);

        setIsLoading1(false);
      } catch (error) {
        setError1(error.message);
      }
    };

    updateInfo();
  };

  const form2SubmitHandler = (e) => {
    e.preventDefault();

    const updatePassword = async () => {
      try {
        setIsLoading2(true);
        setSuccessMsg2("");
        setError2("");

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/password/${userId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ password }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSuccessMsg2(data.message);
        setIsLoading2(false);
        passwordReset();
      } catch (error) {
        setError2(error.message);
      }
    };

    updatePassword();
  };

  return (
    <main className={classes.container}>
      {successMsg1 && <p>{successMsg1}</p>}
      {error1 && <p>{error1}</p>}
      <form onSubmit={form1SubmitHandler}>
        <Input
          element="input"
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          required={true}
          value={inputName}
          onChange={nameChangeHandler}
          className={`${classes.input}`}
        />
        <Input
          element="input"
          label="Work Email"
          name="work_email"
          type="email"
          placeholder="Your mail"
          required={true}
          value={wEmail}
          onChange={wEmailChangeHandler}
          onBlur={wEmailBlurHandler}
          hasError={
            wEmailHasError && (
              <p className={classes.err}>Please input a valid email address</p>
            )
          }
          className={`${classes.input}`}
        />
        <Input
          element="input"
          label="Personal Email"
          name="email"
          type="email"
          placeholder="Your mail"
          required={true}
          value={pEmail}
          onChange={pEmailChangeHandler}
          onBlur={pEmailBlurHandler}
          hasError={
            pEmailHasError && (
              <p className={classes.err}>Please input a valid email address</p>
            )
          }
          className={`${classes.input}`}
        />
        <Button disabled={!form1IsValid || isLoading1} type="submit">
          SAVE CHANGES
        </Button>
      </form>
      <div className={classes.form2}>
        {successMsg2 && <p>{successMsg2}</p>}
        {error2 && <p>{error2}</p>}
        <h2 className={classes.h2}>Update Password</h2>
        <p className={classes.p2}>
          To update your password enter a new one below. Strong passwords have
          at least six characters, and use upper and lower case letters,
          numbers, and symbols like ! ” ? $ % ^ & ( ) .
        </p>
        <form onSubmit={form2SubmitHandler}>
          <Input
            element="input"
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            required={true}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            hasError={
              passwordHasError && (
                <p className={classes.err}>Password is not strong</p>
              )
            }
            className={`${classes.input}`}
          />
          <Button disabled={!form2IsValid || isLoading2} type="submit">
            SAVE CHANGES
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SettingsForm;
