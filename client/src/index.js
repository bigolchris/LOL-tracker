import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./main";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./login"
import {Header}  from "./Header";
import { Favorites } from "./Favorites";
import { Footer } from "./Footer";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Header />
    {/* <Favorites /> */}
    <Main />
    
    {/* <PlayerCard /> */}
    <Footer />
    </AuthProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
