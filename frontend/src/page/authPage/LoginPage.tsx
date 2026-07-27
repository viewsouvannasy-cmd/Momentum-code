import { Link, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { LoadButton } from "../../components/load-button/LoadButton";
import { FullLogo } from "../../components/logo/FullLogo";
import "./authPage.css";

type fetchResult = {
  success: boolean;
  msg: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState("close");

  // state to store input info
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // state to store result from server
  const [resultFetch, setResultFetch] = useState<fetchResult>();

  // function fetch valid login
  const fetchLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          user_name: inputName,
          user_password: inputPassword,
        },
      );
      setIsLading(false);
      handleToMainApp(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setIsLading(false);
          setResultFetch(error.response.data);
        }
      }
    }
  };

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetchLogin();
    setIsLading(true);
  }
  function handleShowPassword() {
    setIsShowPassword(isShowPassword === "close" ? "open" : "close");
  }

  function handleToMainApp(data: fetchResult) {
    if (data.success) {
      navigate(`/app/${inputName}`);
    }
  }

  return (
    <div className="container-background-image login">
      <img src="/background-image.png" />
      <div>
        <div>
          <FullLogo />
        </div>
        <div className="container-card-form-and-title-main">
          <div className="container-card-form-and-title login">
            <div>
              <h1>Log in</h1>
              <span>Pick up right where you left off.</span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="box-input-name login">
                <label>Name</label>
                <input
                  type="text"
                  minLength={1}
                  maxLength={100}
                  placeholder="Your name"
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                  required
                />
              </div>
              <div className="box-input-password login">
                <label>Password</label>
                <input
                  type={isShowPassword === "close" ? "password" : "text"}
                  minLength={8}
                  maxLength={100}
                  placeholder="••••••••"
                  onChange={(e) => setInputPassword(e.target.value)}
                  value={inputPassword}
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
              </div>

              {!isLoading ? (
                <div
                  className={`box-submit-btn-and-error-msg ${resultFetch?.success === false && "error"}`}
                >
                  <span>{resultFetch?.msg}</span>
                  <button type="submit">Log in</button>
                </div>
              ) : (
                <LoadButton />
              )}
            </form>
            <p>
              Don't have an account?
              <Link to="/sign" className="link-to-sign-up-login">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
