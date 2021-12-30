import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from "./context/context";

ReactDOM.render(
  <SpeechProvider appId="647e0a8f-f17c-401b-984f-e10653edbb84" lenguage="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
