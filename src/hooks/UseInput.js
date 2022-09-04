import { useReducer } from "react";

const defaultStateReducer = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "CHANGE_VALUE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return {
    defaultStateReducer,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatchInputAction] = useReducer(inputStateReducer, defaultStateReducer);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatchInputAction({ type: "CHANGE_VALUE", value: e.target.value });
  };

  const valueBlurHandler = () => {
    dispatchInputAction({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInputAction({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
