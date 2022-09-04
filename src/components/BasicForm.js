import useInput from "../hooks/UseInput";
import { validateEmail } from "../util/regularExpression";

const BasicForm = (props) => {
  const {
    value: nameValue,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: lastNameValue,
    valueChangeHandler: lastNameChangeHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: emailValue,
    valueChangeHandler: emailChangeHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => validateEmail(value));

  let formValid = false;

  if (nameIsValid && emailIsValid && lastNameIsValid) {
    formValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailHasError || lastNameHasError || nameHasError) {
      return;
    }
    console.log({ name: nameValue, lastname: lastNameValue, email: emailValue });
    resetLastName();
    resetName();
    resetEmail();
  };

  const nameInputClasses = nameHasError ? "form-control invalid" : "form-control ";
  const lastNameInputClasses = lastNameHasError ? "form-control invalid" : "form-control ";
  const emailInputClasses = emailHasError ? "form-control invalid" : "form-control ";

  return (
    <form>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className="error-text">Name must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p className="error-text">Last name must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Please Enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formValid} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
