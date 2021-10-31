import React from "react";
import useGame from "../hook/useGame";
import { RoomStatus } from "../modules/game/game";
import Login from "./Login";
import WaitingRoom from './WaitingRoom';

const Main: React.FC = () => {
  const { auth, status, sendConnectRequest } = useGame();

  if (auth == null) {
    sendConnectRequest();
    // TODO: 로딩 스피너
    return <></>;
  }

  if (status?.roomStatus === RoomStatus.CONNECTED) {
    return <Login />
  }

  if (status?.roomStatus === RoomStatus.REGISTER) {
    return <WaitingRoom />
  }
  // TODO
  return <></>
};

export default Main;
