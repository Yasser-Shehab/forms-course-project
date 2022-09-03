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

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = validateEmail(enteredEmail);
  const emailInputInvalid = !enteredEmailIsValid && enteredEmailTouched;
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!nameInputHasError) {
      return;
    }

    console.log(enteredName);
    resetName();
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control ";
  const emailInputClasses = emailInputInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
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
          onChange={emailInputHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputInvalid && <p className="error-text">Email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
