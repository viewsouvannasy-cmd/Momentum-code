// library
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";

// components
import { LoadButton } from "../../components/load-button/LoadButton";
import { FullLogo } from "../../components/logo/FullLogo";
import { EyeIcon } from "../../components/icon-svg/EyeIcon";

// context api
import useToggleTheme from "../../store/theme/useToggleTheme";

// helper function
import { getHostServer } from "../../utils/getENV";

// css
import "./authPage.css";

type FetchResult = {
  success: boolean;
  msg: string;
  results?: { user_name: string; user_email: string };
};

export function LoginPage() {
  // this is use to change color of image
  const { themeColor } = useToggleTheme();

  const [isLoading, setIsLading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // state to store input info
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // state to store result from server
  const [resultFetch, setResultFetch] = useState<FetchResult>();

  // function fetch valid login
  const fetchLogin = async () => {
    try {
      const hostServer = getHostServer();
      const response = await axios.post(
        `${hostServer}/api/auth/login`,
        {
          user_name: inputName,
          user_password: inputPassword,
        },
        { withCredentials: true },
      );
      setIsLading(false);
      handleToMainApp(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response) {
          setIsLading(false);
          setResultFetch(error.response.data);
          return;
        }
        setIsLading(false);
      }
    }
  };

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchLogin();
    setIsLading(true);
  }

  function handleToMainApp(data: FetchResult) {
    if (data.success) {
      window.open("/app/inbox", "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="container-background-image login">
      <img src={`/background-image-${themeColor}.png`} />
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
                <div>
                  <label>Password</label>
                  <Link
                    to="/forgot-password"
                    className="link-to-forgot-password-page"
                  >
                    Forgot Password
                  </Link>
                </div>
                <input
                  type={isShowPassword ? "text" : "password"}
                  minLength={8}
                  maxLength={100}
                  placeholder="Enter your password"
                  onChange={(e) => setInputPassword(e.target.value)}
                  value={inputPassword}
                  required
                />
                <EyeIcon
                  isShowPassword={isShowPassword}
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              </div>

              <div
                className={`box-submit-btn-and-error-msg ${resultFetch?.success === false && "error"}`}
              >
                <span>{resultFetch?.msg}</span>
                <button
                  type="submit"
                  className={
                    isLoading ? "btn-submit-login-load" : "btn-submit-login"
                  }
                  disabled={isLoading}
                >
                  {isLoading && <LoadButton />}
                  {!isLoading && "Log in"}
                </button>
              </div>
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
