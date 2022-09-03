import { useEffect, useState } from "react";
import { validateEmail } from "../util/regularExpression";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;
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
  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true);
  };

  const nameInputHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (!nameInputInvalid) {
      return;
    }

    console.log(enteredName);
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputInvalid ? "form-control invalid" : "form-control ";
  const emailInputClasses = emailInputInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputHandler} onBlur={nameInputBlurHandler} />
        {nameInputInvalid && <p className="error-text">Name must not be empty</p>}
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
