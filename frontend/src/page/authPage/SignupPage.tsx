import { useState } from "react";
import { Link } from "react-router";
import "./authPage.css";

export function SignupPage() {
  const [isCheck, setIsCheck] = useState(false);

  function handleIsCheck() {
    setIsCheck(isCheck ? false : true);
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
              required
            />
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
            <div className="box-password-sign-up">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
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
