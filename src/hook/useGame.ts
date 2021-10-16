import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { connectRequest } from "../modules/game/game";

const useGame = () => {
  const { auth, status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const sendConnectRequest = () => {
    const token = localStorage.getItem("token");
    dispatch(connectRequest(token));
  };

  return {
    auth,
    status,
    sendConnectRequest,
  }
}

export default useGame;
