import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Router from "./routes/Router";
import "./assets/scss/main.scss";
import { Provider } from "react-redux";
import store from "./ducks/configStore";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
