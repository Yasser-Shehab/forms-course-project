import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

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
