import { createContext } from "react";

export const ModalContext = createContext({
  signupModalState: true,
  sendSignupModalState: () => {},
});
