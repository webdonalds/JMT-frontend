import React from 'react';
import useGame from '../hook/useGame';

const WaitingRoom: React.FC = () => {
  const { auth, status, changeReady } = useGame();
  const myNickname = auth?.name;
  if (myNickname == undefined) {
    alert('에러가 발생했습니다. 새로고침해주세요.');
    return (<></>);
  }
  const readied = status?.readiedUsers.includes(myNickname);

  const userView = (name: string, readied: boolean) => {
    return (
      <div key={name}>
        <span className={myNickname==name ? "font-bold" : ""}>{name}</span>
        <span className="ml-5">{readied ? "READY" : ""}</span>
      </div>
    );
  }

  // TODO: ready를 해제하는 기능?
  const readyButton = () => {
    if (readied)  return null;
    return (
      <button className="bg-green-200" onClick={handleChangeReady}>Ready</button>
    );
  }

  const handleChangeReady = () => {
    changeReady(!readied);
  }

  return (
    <div>
      <div>
        {status?.users.map(userName => userView(userName, status.readiedUsers.includes(userName)))}
      </div>
      {readyButton()}
    </div>
  );
}

export default WaitingRoom;
