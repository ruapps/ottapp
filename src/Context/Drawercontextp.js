import React, { useState } from "react";
import { Drawercontext } from "./Drawercontext";

const Drawercontextp = ({ children }) => {
  const [Categories, setCategories] = useState(null);

  const sendCategories = (list) => {
    setCategories(list);
  };

  return (
    <Drawercontext.Provider value={{ Categories, sendCategories }}>
      {children}
    </Drawercontext.Provider>
  );
};

export default Drawercontextp;
