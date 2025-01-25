//? Import libraries and dependencies
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

//? Create context for auth
export const AuthContext = createContext();

//? Create context provider
export function AuthContextProvider({ children }) {
  //* Initially set the state to null
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchToken = async () => {
    const storedToken = Cookies.get("token");
    setToken(storedToken);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  //* If the user doesnot exist but token is present in secure storage, get the user info
  useEffect(() => {
    if (!user) {
      if (token) {
        getUserInfo(token);
      }
    }
  }, [token]);

  //* Get user info from the server by making a get request to the userInfo route
  const getUserInfo = (token) => {
    axios
      .get(routes.userInfo, {
        //* Set the Authorization header with the token
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //* Set the user state with the user info and token
        setUser(res.data?.data);
        setLoadingUser(false);
        console.log("Context User", res.data?.data);
      })
      //* If there is an error, log the error to the console
      .catch((err) => {
        console.log("Error in getting user ===>>>", err.response.data);
        setLoadingUser(false);
        setUser(false);
      });
  };

  //* Return the AuthContext.Provider with the value of user and setUser
  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, loadingUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
