import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { AuthInfo, changeMyReadyStatus, connectRequest, GameStatus, registerRequest } from "../modules/game/game";

type userGameTypes = {
  auth: AuthInfo | null,
  status: GameStatus | null,
  sendConnectRequest: () => void,
  sendRegisterRequest: (name: string, present: string) => void,
  changeReady: (ready: boolean) => void,
}

const useGame = (): userGameTypes => {
  const { auth, status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const sendConnectRequest = () => {
    const token = localStorage.getItem("token");
    dispatch(connectRequest(token));
  };

  const sendRegisterRequest = (name: string, present: string) => {
    dispatch(registerRequest(name, present));
  }

  const changeReady = (ready: boolean) => {
    dispatch(changeMyReadyStatus(ready));
  }

  return {
    auth,
    status,
    sendConnectRequest,
    sendRegisterRequest,
    changeReady,
  }
}

export default useGame;
