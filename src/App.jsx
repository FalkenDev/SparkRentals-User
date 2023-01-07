import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, LoginForm } from "./components";
import auth from "./models/auth.js"
import { Home, LoginFailure, LoginSuccess, Logout, Account } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
const App = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const { setIsLoggedIn, setIsGoogleAcc } = useStateContext();
  useEffect(() => {
    async function checkloggedIn() {
      const res = auth.loggedIn()
      const resGoogle = await auth.getUser()
      console.log("resGoogle-------------------->", resGoogle);
      console.log("res1-------------------->", res);
      if(res) {
        setIsLoggedIn(true);
      } 
      if(resGoogle) {
        console.log("resGoogle Ska SÄTTAS TILL TRUE");
        setIsGoogleAcc(true);
        setIsLoggedIn(true);
      }
    }
    checkloggedIn();
  },[]);

  const overlay = () => {
    let state = { click: "auto", backdrop: "blur(0px)" };
    document.body.style.overflow = "visible";
    if (displayForm) {
      document.body.style.overflow = "hidden";
      state = { click: "none", backdrop: "blur(4px)" };
    }
    return state;
  };

  return (
    <div className="flex flex-col h-screen w-full ">
      {displayForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
        transform -translate-x-1/2 -translate-y-1/2"
        >
          <LoginForm setDisplayForm={setDisplayForm} />
        </div>
      ) : null}
      <div
        style={{
          pointerEvents: overlay().click,
          filter: overlay().backdrop,
        }}
      >
        <Header setDisplayForm={setDisplayForm} />

        <div className="mb-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/google/failure" element={<LoginFailure />} />
            <Route path="/login/google/success" element={<LoginSuccess />}/>
            <Route path="/logout/google" element={<Logout />}/>
            <Route path="/account" element={<Account />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
