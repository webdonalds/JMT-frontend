import React from 'react';
import useGame from '../hook/useGame';

const WaitingRoom: React.FC = () => {
  const { auth, status } = useGame();
  const myNickname = auth?.name;

  const userView = (name: string, readied: boolean) => {
    return (
      <div key={name}>
        <span className={myNickname==name ? "font-bold" : ""}>{name}</span>
        <span className="ml-5">{readied ? "READY" : ""}</span>
      </div>
    );
  }

  return (
    <div>
      {status?.users.map(userName => userView(userName, status.readiedUsers.includes(userName)))}
    </div>
  );
}

export default WaitingRoom;
