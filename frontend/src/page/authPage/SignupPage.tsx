import { useState } from "react";
import { Link } from "react-router";
import "./authPage.css";

export function SignupPage() {
  const [isCheck, setIsCheck] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState("close");

  // this state use to store user input
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPasswrod, setInputPassword] = useState("");

  function handleIsCheck() {
    setIsCheck(isCheck ? false : true);
  }

  function handleShowPassword() {
    setIsShowPassword(isShowPassword === "close" ? "open" : "close");
  }

  return (
    <div className="container-background-image sign">
      <img src="/background-image.png" />
      <div>
        <div className="container-card-form-and-title sign">
          <div>
            <h1>Create your account</h1>
            <span>Free forever. No credit card needed.</span>
          </div>
          <form>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              minLength={1}
              maxLength={50}
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              required
            />
            <label>Email</label>
            <input
              minLength={1}
              maxLength={50}
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
              required
            />
            <div className="box-password-sign-up">
              <label>Password</label>
              <input
                type={isShowPassword === "close" ? "password" : "text"}
                minLength={8}
                maxLength={100}
                placeholder="••••••••"
                onChange={(e) => setInputPassword(e.target.value)}
                value={inputPasswrod}
                required
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="button"
                onClick={handleShowPassword}
              >
                {isShowPassword === "close" ? (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                ) : (
                  <>
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                )}
              </svg>
              <span>At least 8 characters</span>
            </div>
            <div className="box-submit-and-checkbox-sign-up">
              <div>
                <div
                  className={`checkbox-agree-sign-up ${isCheck && "checked"}`}
                  role="button"
                  onClick={handleIsCheck}
                >
                  <img src="/icon/check-icon.png" />
                </div>
                <p>
                  I agree to Momentum's <span>Terms of Service</span> and{" "}
                  <span>Privacy Policy</span>
                </p>
              </div>
              <button type="submit">Create account</button>
            </div>
          </form>
          <p>
            Already have an account?
            <Link to="/login" className="link-to-sign-up-login">
              Log in
            </Link>
          </p>
        </div>
        <div className="container-logo">
          <img src="/logo/logo-momentum-black.png" />
          <p>Momentum</p>
        </div>
      </div>
    </div>
  );
}
