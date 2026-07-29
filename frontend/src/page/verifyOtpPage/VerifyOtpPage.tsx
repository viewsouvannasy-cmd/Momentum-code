import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { LoadButton } from "../../components/load-button/LoadButton";

import "./VerifyOtpPage.css";

type fetchResult = {
  success: boolean;
  point?: string;
  msg?: string;
};

export function VerifyOtpPage() {
  const navigate = useNavigate();
  // this value it recvie from sign up page
  const location = useLocation();
  const { user_name, user_email, user_password } = location.state;

  const [isLoading, setIsLoading] = useState(false);

  // set count down time expires

  // this state is store input otp
  const [inputOtp, setInputOtp] = useState("");

  //this state is store value from server
  const [fetchResult, setFetchResult] = useState<fetchResult>();

  // this function will send a otp and user info to a server
  // this will save a user to database if valid success
  const fetchVerifyOtpEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        {
          user_name: user_name,
          user_email: user_email,
          user_password: user_password,
          otp_code: inputOtp,
        },
        { withCredentials: true },
      );
      setIsLoading(false);
      handleToMainApp(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setIsLoading(false);
          setFetchResult(error.response.data);
        }
      } else {
        console.log(error);
      }
    }
  };

  // this function will lead a user to main app
  function handleToMainApp(data: fetchResult) {
    if (data.success) {
      navigate(`/app/${user_name}`);
    }
  }

  // class a fetch verift otp
  function handleSendOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetchVerifyOtpEmail();
    setIsLoading(true);
  }

  function handleRemoveHightLightError() {
    if (fetchResult?.success === false) {
      setFetchResult({
        success: false,
        point: "",
        msg: "",
      });
    }
  }

  return (
    <div className="container-verify-otp-main">
      <div>
        <img src="/logo/logo-momentum-black.png" />
        <p>Momentum</p>
      </div>
      <form className="box-input-otp-verify" onSubmit={handleSendOtp}>
        <h2>Verify your email</h2>
        <span>we send otp code to</span>
        <p>{user_email}</p>
        <div
          className={`box-verift-otp-input-with-error-message ${fetchResult?.point === "verify" && "error"}`}
        >
          <input
            placeholder="XXXXXX"
            maxLength={6}
            minLength={6}
            onFocus={handleRemoveHightLightError}
            onChange={(e) => setInputOtp(e.target.value)}
            value={inputOtp}
            required
          />
          <span>{fetchResult?.msg}</span>
        </div>

        <span className="count-expires">
          expires code in<span> 5 min</span>
        </span>
        {!isLoading ? <button type="submit">Verify</button> : <LoadButton />}
      </form>
      <Link className="back-to-sign-up-from-verify" to="/sign">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Back to sign up
      </Link>
    </div>
  );
}
