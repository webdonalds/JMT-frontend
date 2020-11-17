import React, { useState } from 'react';
import LoginInput from './LoginInput';
import './Login.css';

const Login: React.FC = () => {
  const nameInputText = '이름';
  const [name, setName] = useState<string>('');
  const handleNameChange = (value: string) => {
    setName(value);
  };
  const presentInputText = '선물';
  const [present, setPresent] = useState<string>('');
  const handlePresentChange = (value: string) => {
    setPresent(value);
  };

  const handleLogin = () => {
    // TODO
    console.log(name, present);
  }

  return (
    <div className="login-container">
      <h1>JMT</h1>
      <div>
        <LoginInput inputName={nameInputText} inputValue={name} handleChange={handleNameChange} />
        <LoginInput inputName={presentInputText} inputValue={present} handleChange={handlePresentChange} />
        <button type="button" className="btn btn-success login-button" onClick={handleLogin}>시작</button>
      </div>
    </div>
  );
}

export default Login;