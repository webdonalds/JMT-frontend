import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import rootReducer from './modules';
import Main from "./component/Main";

const store = createStore(rootReducer, applyMiddleware(Thunk));

const App: React.SFC = () => (
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