import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true);
    if (enteredName.trim() == "") {
      setEnteredNameIsValid(false);
      return;
    }
  };

  const nameInputHandler = (e) => {
    setEnteredName(e.target.value);

    if (enteredName.trim() !== "") {
      setEnteredNameIsValid(true);
      return;
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() == "") {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    console.log(enteredName);
  };

  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputInvalid ? "form-control invalid" : "form-control ";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputHandler} onBlur={nameInputBlurHandler} />
        {nameInputInvalid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
