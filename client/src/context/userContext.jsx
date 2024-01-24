import { createContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Create a UserProvider component to wrap your app and provide the user data
const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  function setUserFn(user) {
    setUser(user);
  }

  useEffect(() => {
    const retrievedUser = JSON.parse(localStorage.getItem("user-data"));

    if (retrievedUser) {
      setUser(retrievedUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUserFn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
