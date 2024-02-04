import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );

  console.log(userInfo);

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    userInfo?.token || null
  }`;

  return (
    <AppContext.Provider value={{ setUserInfo, userInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
