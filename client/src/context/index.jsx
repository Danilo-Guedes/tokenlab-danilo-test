import { UserProvider } from "./userContext";

export const GlobalProvider = ({ children }) => {
  // Your global state and logic here

  return <UserProvider>{children}</UserProvider>;
};
