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

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signUp" element={<SignUp></SignUp>} />
            <Route  path="/verify-email" element={<VerifyEmail></VerifyEmail>} >
              <Route path=":verificationToken" element={<VerifyEmail />} />
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
