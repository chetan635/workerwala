import "./App.css";
import "./css/common/basic-custom-css.css";
import "./css/common/override-chakra-ui-css.css";
import Login from "./pages/Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Authentication/SignUp";
import AuthProvider from "./lib/AuthProvider";
import Home from "./pages/Home/Home";
import PrivateRoute from "./lib/PrivateRoute";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import EmailRedirect from "./pages/Authentication/EmailRedirect";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ChangePassword from "./components/Authentication/ChangePassword";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signUp" element={<SignUp></SignUp>} />
            <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-redirect" element={<EmailRedirect />}>
              <Route path=":verificationToken" element={<EmailRedirect />} />
            </Route>
            <Route path="/change-password" element={<ChangePassword />}>
              <Route path=":verificationToken" element={<ChangePassword />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
