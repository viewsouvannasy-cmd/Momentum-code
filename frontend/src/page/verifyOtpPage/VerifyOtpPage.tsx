import { Link } from "react-router";
import "./VerifyOtpPage.css";

export function VerifyOtpPage() {
  return (
    <div className="container-verify-otp-main">
      <div>
        <img src="/logo/logo-momentum-black.png" />
        <p>Momentum</p>
      </div>
      <form className="box-input-otp-verify">
        <h2>Verify your email</h2>
        <span>We send otp code to</span>
        <p>view@gmail.com</p>
        <input type="number" max="6" placeholder="XXXXXX" required />
        <span className="count-expires">
          expires code at <span>2:30</span>
        </span>
        <button type="submit">Verify</button>
      </form>
      <Link className="back-to-sign-up-from-verify" to="/sign">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Back to sign up
      </Link>
    </div>
  );
}
