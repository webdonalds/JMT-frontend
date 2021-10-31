import React, { useState } from 'react';
import useGame from '../hook/useGame';

const Login: React.FC = () => {
  const { sendRegisterRequest } = useGame();

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

  const LoginInput = (title: string, value: string, handleChange: (value: string) => void) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    };

    return (
      <div className="mt-10">
        <span>{title}: </span>
        <input type="text" value={value} onChange={onChange} />
      </div>
    );
  };

  const handleLogin = () => {
    sendRegisterRequest(name, present);
  }

  return (
    <div className="h-full pt-40 text-center">
      <h1>JMT</h1>
      <div>
        { LoginInput(nameInputText, name, handleNameChange) }
        { LoginInput(presentInputText, present, handlePresentChange) }
        <button type="button" className="mt-10" onClick={handleLogin}>시작</button>
      </div>
    </div>
  );
}

export default Login;
