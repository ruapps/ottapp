import React, { useState } from "react";
import { Searchcontext } from "./Searchcontext";

const Searchcontextp = ({ children }) => {
  const [labelval, setLabelVal] = useState(null);

  const sendLabelVal = (e, value) => {
    setLabelVal(value);
  };

  return (
    <Searchcontext.Provider value={{ labelval, sendLabelVal }}>
      {children}
    </Searchcontext.Provider>
  );
};

export default Searchcontextp;
