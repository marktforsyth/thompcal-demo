import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyB757WbKCKpw983rxERQZ3kq7q3cNzgflI",
  authDomain: "thompcal-demo.firebaseapp.com",
  projectId: "thompcal-demo",
  storageBucket: "thompcal-demo.appspot.com",
  messagingSenderId: "27661333014",
  appId: "1:27661333014:web:db423bf8a090a1538dbb37",
};

initializeApp(firebaseConfig);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
