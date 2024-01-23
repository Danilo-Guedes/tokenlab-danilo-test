import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUserData = () => {
  const { user, setUserFn } = useContext(UserContext);

  // useEffect(() => {
  //   console.log({ userNoUseUserDataHook: user });
  // }, [user]);

  return { user, setUserFn };
};

export default useUserData;
