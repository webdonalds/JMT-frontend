import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import rootReducer from './modules';
import Main from "./component/Main";
import socketMiddleware from "./modules/middleware/socket";

const store = createStore(rootReducer, applyMiddleware(socketMiddleware));

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
