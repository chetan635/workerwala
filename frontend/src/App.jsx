import "./App.css";
import "./css/common/basic-custom-css.css";
import Login from "./pages/Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
