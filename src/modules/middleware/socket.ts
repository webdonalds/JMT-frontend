import { Dispatch } from "react";
import { connected, GameActions, CONNECT_REQUEST, REGISTER_REQUEST, readyStatusChanged, CHANGE_MY_READY_STATUS } from "../game/game";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
enum ReceiveEventType {
  CONNECTED = "connected",
  JOINED = "joined",
  LEFT = "left",
  WAITING = "waiting",
  MATCHED = "matched",
  OPENED = "opened",
  FINISHED = "finished",
}

enum SendEventType {
  CONNECT = "connect",
  REGISTER = "register",
  READY = "ready",
  OPEN = "open",
  NEXT = "next",
}

type EventType = SendEventType | ReceiveEventType;

type MessageResponse = {
  data: string, // JSON string. have to parse
}

type Message = {
  event: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeMessage = (event: EventType, payload: any): string => {
  return JSON.stringify({
    event: event,
    payload: payload,
  });
};

const socketMiddleware = () => {
  let ws: WebSocket | null = null;

  const onOpen = (token: string | null) => (data: Event) => {
    if (data.type !== "open") {
      alert("연결에 실패했습니다.");
      return;
    }
  
    if (token == null) {
      token = uuidv4();
    }
    ws?.send(makeMessage(SendEventType.CONNECT, {
      token: token,
    }));
  };

  const onClose = () => () => {
    alert("연결이 끊겼습니다.");
  };

  const onMessage = (store: any) => (messageResponse: MessageResponse) => {
    const message: Message = JSON.parse(messageResponse.data);
    switch (message.event) {
      case ReceiveEventType.CONNECTED:
        const token: string = JSON.parse(messageResponse.data).payload.token;
        localStorage.setItem("token", token);
        store.dispatch(connected(token));
        break;
      case ReceiveEventType.WAITING:
        // TODO: Register을 하지 않은 상태에도 해당 이벤트가 내려옴
        // TODO: 서버에서 해당 상태에서는 내려오지 않게 수정하거나, 닉네임 중복검사를 하고 본인 닉네임이 있는지 확인이 필요함.
        const usersInfo = JSON.parse(messageResponse.data).payload;
        const users: string[] = usersInfo.users;
        const readiedUsers: string[] = usersInfo.readiedUsers;

        const myNickname: string | null = localStorage.getItem("nickname");
        if (myNickname != null && users.includes(myNickname)) {
          store.dispatch(readyStatusChanged(users, readiedUsers));
        }
        break;
    }
  };

  const onError = () => () => {
    alert("에러가 발생했습니다.");
  }

  // the middleware part of this function
  return (store: any) => (next: Dispatch<GameActions>) => (action: GameActions) => {
    switch (action.type) {
      case CONNECT_REQUEST:
        if (ws !== null) {
          ws.close();
        }
        const token = action.payload.token;

        ws = new WebSocket(SOCKET_URL);
        ws.onmessage = onMessage(store);
        ws.onclose = onClose();
        ws.onopen = onOpen(token);
        ws.onerror = onError();

        // TODO: nickname 불러오기
        break;
      case REGISTER_REQUEST:
        localStorage.setItem("nickname", action.payload.nickname);
        ws?.send(makeMessage(SendEventType.REGISTER, {
          nickname: action.payload.nickname,
          present: action.payload.present
        }));
        return next(action);
      case CHANGE_MY_READY_STATUS:
        ws?.send(makeMessage(SendEventType.READY, {}))
        return next(action);
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
