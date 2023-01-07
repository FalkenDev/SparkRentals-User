import React, { createContext, Profiler, useContext, useState } from "react";

const StateContext = createContext();
// const initialState = {
//   token: false,
// };

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogleAcc, setIsGoogleAcc] = useState(false);
  const [isServerAcc, setIsServerAcc] = useState(false);

  return (
    <StateContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        isGoogleAcc,
        setIsGoogleAcc,
        isServerAcc,
        setIsServerAcc
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
