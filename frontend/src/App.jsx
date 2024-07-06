import "./App.css";
import "./css/common/basic-custom-css.css";
import "./css/common/override-chakra-ui-css.css"
import Login from "./pages/Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Authentication/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signUp" element={<SignUp></SignUp>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
