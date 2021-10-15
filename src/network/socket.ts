enum ReceiveEventType {
  CONNECTED = "connected",
  JOINED = "joined",
  LEFT = "left",
  WAITING = "waiting",
  MATCHED = "matched",
  OPENED = "opened",
  FINISHED = "finished",
}

export enum SendEventType {
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

// TODO: token 저장
const handleConnected = (token: string): void => {
  console.log(token);
}

// TODO
const handleWaiting = (users: string[], readiedUsers: string[]): void => {
  console.log(users);
  console.log(readiedUsers);
}

const ws = new WebSocket(SOCKET_URL);

ws.onopen = (data: Event) => {
  if (data.type !== "open") {
    alert("연결에 실패했습니다.");
    return;
  }

  // TODO: token 생성
  ws.send(makeMessage(SendEventType.CONNECT, {
    token: "ebubu",
  }));
}

ws.onclose = () => {
  alert("연결이 끊겼습니다.");
}

ws.onmessage = (messageResponse: MessageResponse) => {
  const message: Message = JSON.parse(messageResponse.data);
  switch (message.event) {
    case ReceiveEventType.CONNECTED:
      handleConnected(message.payload.token);
      break;
    case ReceiveEventType.WAITING:
      handleWaiting(message.payload.users, message.payload.readiedUsers);
      break;
  }
}

ws.onerror = () => {
  alert("에러가 발생했습니다.");
}

export {
  ws
};
