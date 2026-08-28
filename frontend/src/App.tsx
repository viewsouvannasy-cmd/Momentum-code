import { Routes, Route } from "react-router";

import { LoginPage } from "./page/authPage/LoginPage";
import { SignupPage } from "./page/authPage/SignupPage";
import { VerifyOtpPage } from "./page/verifyOtpPage/VerifyOtpPage";
import { LandingPage } from "./page/landingPage/LandingPage";
import { ErrorPage } from "./page/errorPage/ErrorPage";
import { ResetPasswordPage } from "./page/resetPasswordPage/ResetPasswordPage";
import { ForgotPasswordPage } from "./page/forgotPassswordPage/ForgotPasswordPage";

import { AppPage } from "./page/appPage/AppPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignupPage />} />
      <Route path="/verify-otp/:name" element={<VerifyOtpPage />} />
      <Route path="/app/:section" element={<AppPage />} />
      <Route path="/app/group/:groupId" element={<AppPage />} />
      <Route path="/app/preview/:date" element={<AppPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
