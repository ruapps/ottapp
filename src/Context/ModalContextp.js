import React, { useState } from "react";
import {ModalContext}  from "./ModalContext";

const ModalContextp = ({ children }) => {
  const [signupModalState, setSignupModalState] = useState(null);

  const sendSignupModalState = (value) => {
    console.log(value)
    setSignupModalState(value);
  };

  return (
    <ModalContext.Provider value={{ signupModalState, sendSignupModalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextp;
