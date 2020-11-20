import React from "react";
import "./LoginInput.css";

type LoginInputProps = {
  handleChange: (value: string) => void,
  inputName: string,
  inputValue: string,
};

const LoginInput: React.FC<LoginInputProps> = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange(e.target.value);
  };
  return (
    <div className="login-input-container">
      <span>{props.inputName}: </span>
      <input type="text" value={props.inputValue} onChange={onChange} />
    </div>
  );
};

export default LoginInput;