import { useEffect, useState } from "react";
import { validateEmail } from "../util/regularExpression";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetName,
    valueChangeHanlder: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    reset: resetEmail,
    valueChangeHanlder: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => validateEmail(value));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (nameInputHasError && emailInputHasError) {
      return;
    }

    console.log(enteredName);
    resetName();
    resetEmail();
  };

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control ";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={formSubmitHandler}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
