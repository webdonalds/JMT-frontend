import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { connectRequest, registerRequest } from "../modules/game/game";

const useGame = () => {
  const { auth, status } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const sendConnectRequest = () => {
    const token = localStorage.getItem("token");
    dispatch(connectRequest(token));
  };

  const sendRegisterRequest = (name: string, present: string) => {
    dispatch(registerRequest(name, present));
  }

  return {
    auth,
    status,
    sendConnectRequest,
    sendRegisterRequest,
  }
}

export default useGame;
