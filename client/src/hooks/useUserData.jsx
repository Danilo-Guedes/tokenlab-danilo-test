import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUserData = () => {
  const { user, setUserFn } = useContext(UserContext);

  return { user, setUserFn };
};

export default useUserData;
