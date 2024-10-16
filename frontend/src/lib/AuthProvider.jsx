import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiCall, makeApiCallWithFormData, makeApiCallWithHeadersWithoutBody } from "../utils/ApiCallService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
    /**
     * API call to iniciate SignUp process
     */
    const signUpResponse = await makeApiCall("POST", "auth/register", {
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role,
    }).then((res) => res.json());
    return signUpResponse;
  };

  /**
   * Method to make the sign UP request for the workerwala using provided information.
   *
   * @param data Containing all the details of the workerwala to set it to the backend.
   */
  const SignUpAsWorkerwala = async (workerWalaInfo) => {
    /**
     * Create formData from received info form worker to send it to the backend.
     */
    const formData = new FormData();
    formData.append(
      "workerWalaInfoJsonString",
      workerWalaInfo.workerWalaInfoString
    );
    formData.append("governmentId", workerWalaInfo.governmentId);
    formData.append("proofOfAddress", workerWalaInfo.proofOfAddress);
    formData.append("professionalLicense", workerWalaInfo.professionalLicense);
    formData.append("profilePicture", workerWalaInfo.profilePicture);

    /**
     * API call to the signUp service in backend.
     */
    const signUpWorkerwalaResponse = await makeApiCallWithFormData(
      "POST",
      "auth/registerWorkerWala",
      formData
    ).then((res) => res.json());

    return signUpWorkerwalaResponse;
  };

  /**
   * Method to Login the user to the workerwala.
   *
   * @param {*} loginData  Contains the userName and password to login the user to the workerWala.
   * @returns
   */
  const loginUser = async (loginData) => {
    try {
      /**
       * API call for login process
       */
      const response = await makeApiCall("POST", "auth/login", {
        username: loginData.username,
        password: loginData.password,
      });

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
        return loginResponse;
      } else if (loginResponse.status == "failure") {
        return loginResponse;
      }
    } catch (error) {
      throw "Something went wrong!";
    }
  };

  /**
   * Method to Refresh the JWT token for user Authentication.
   */
  const refreshTokenData = async () => {
    const tokenRefreshData = await makeApiCall("POST", "auth/refresh", {
      refreshToken: refreshToken,
    })
      .then((res) => res.json())
      .catch(() => logoutUser());

    setAccessToken(tokenRefreshData.accessToken);
    localStorage.setItem(
      "_Authentication_app_react_Token",
      tokenRefreshData.accessToken
    );
    localStorage.setItem(
      "_Authentication_app_react_Refresh_Token",
      refreshToken
    );
  };

  /**
   * Method to fectch the current user details
   */
  const getCurrentUser = async () => {
    {
      try {
        const response = await makeApiCallWithHeadersWithoutBody(
          "GET",
          "user/currentUser",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();

        setUser(data);
        return data;
        // Set the user details in state
      } catch (err) {
        throw err; // Handle any errors
      }
    }
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
        refreshToken,
        accessToken,
        user,
        loginUser,
        logoutUser,
        SignUpUser,
        SignUpAsWorkerwala,
        getCurrentUser,
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
