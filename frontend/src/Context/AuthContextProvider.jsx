import { createContext, useState } from "react";
export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    false || sessionStorage.getItem("isAuth")
  );
  const [token, setToken] = useState("");
  const [fullName, setFullName] = useState("");
  console.log("isAuth in auth context", isAuth, token, fullName);


  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        token,
        setToken,
        fullName,
        setFullName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
