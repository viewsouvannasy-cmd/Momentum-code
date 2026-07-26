import { Routes, Route } from "react-router";
import { LoginPage } from "./page/authPage/LoginPage";
import { SignupPage } from "./page/authPage/SignupPage";
import { VerifyOtpPage } from "./page/verifyOtpPage/VerifyOtpPage";
import { AppPage } from "./page/app-page/AppPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignupPage />} />
      <Route path="/verify-otp/:name" element={<VerifyOtpPage />} />
      <Route path="/app/:user_name" element={<AppPage />} />
    </Routes>
  );
}

export default App;
