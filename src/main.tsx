import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/redux/Store.ts";
import UserChangeContext from "./Store/Context/UserChangecontext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <UserChangeContext>
      <App />
    </UserChangeContext>
  </Provider>
);
