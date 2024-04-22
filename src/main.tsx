import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "app/app";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./config/amplify/amplify.config";

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
