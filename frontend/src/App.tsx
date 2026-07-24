import { Routes, Route } from "react-router";
import { LoginPage } from "./page/authPage/LoginPage";
import { SignupPage } from "./page/authPage/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
