import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authConstants } from "../constants/AuthConstants";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("_Authentication_app_react_Token") || ""
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("_Authentication_app_react_Refresh_Token") || ""
  );

  /**
   * Method to make the signUp request for the user using provided details
   *
   * @param data Containing the details like username, password, and email address to register the user
   */
  const SignUpUser = async (data) => {
    const signUpResponse = await fetch(
      `${authConstants.dataBaseServer}/auth/register`,
      {
        method: "POST",
        mode: "cors",

        // Adding body for the Post Request
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email,
          role: data.role,
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "*",
        },
      }
    ).then((res) => res.json());
    return signUpResponse;
  };

  /**
   * Method to Login the user to the workerwala.
   *
   * @param {*} loginData  Contains the userName and password to login the user to the workerWala.
   * @returns
   */
  const loginUser = async (loginData) => {
    try {
      const response = await fetch(
        `${authConstants.dataBaseServer}/auth/login`,
        {
          method: "POST",
          mode: "cors",

          //Adding Body to the request:
          body: JSON.stringify({
            username: loginData.username,
            password: loginData.password,
          }),

          // Adding headers to the login request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "*",
          },
        }
      );

      const loginResponse = await response.json();

      if (loginResponse != null && loginResponse.status == "success") {
        setUser(loginResponse.user);
        setAccessToken(loginResponse.accessToken);
        setRefreshToken(loginResponse.refreshToken);

        // Set Access token and refresh token  in local storage for user authentication
        localStorage.setItem(
          "_Authentication_app_react_Token",
          loginResponse.accessToken
        );

        localStorage.setItem(
          "_Authentication_app_react_Refresh_Token",
          loginResponse.refreshToken
        );
        navigate("/");
        return null;
      } else if (loginResponse.status == "failure") {
        throw loginResponse,message;
      }
    } catch (error) {
      throw "Something went wrong!";
    }
  };

  /**
   * Method to Refresh the JWT token for user Authentication.
   *
   */
  const refreshTokenData = async() => {
    const tokenRefreshData = await fetch(
      `${authConstants.dataBaseServer}/auth/refresh`,
      {
        // Adding method types
        method: "POST",
        mode: "cors",

        // Adding body content to send
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "*",
        },
      }
    )
      .then((res) => res.json())
      .catch(() => logoutUser());

    setAccessToken(tokenRefreshData.accessToken);
    localStorage.setItem(
      "_Authentication_app_react_Token",
      tokenRefreshData.accessToken
    );
  };

  /**
   * Refetch refresh token after regular interval
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      refreshTokenData();
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [user]);

  /**
   * Method to end session and log user out
   * No request call since there is nothing to be handeled in backend.
   */
  const logoutUser = () => {
    setUser(null);
    setAccessToken("");
    localStorage.removeItem("_Authentication_app_react_Token");
    localStorage.removeItem("_Authentication_app_react_Refresh_Token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loginUser,
        logoutUser,
        SignUpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const Auth = () => {
  return useContext(AuthContext);
};
