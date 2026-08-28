// library
import { useParams, Link } from "react-router";
import { useState } from "react";

// components
import { FullLogo } from "../../components/logo/FullLogo";
import { EyeIcon } from "../../components/icon-svg/EyeIcon";
import { LoadButton } from "../../components/load-button/LoadButton";
import { TickIcon } from "../../components/icon-svg/TickIcon";

// api
import { fetchResetPassword } from "../../api/auth";

// type
import type { ResponseStatus } from "../../types/user-type";

// css
import "./ResetPasswordPage.css";

export function ResetPasswordPage() {
  const { token } = useParams();

  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmitdResetPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!token) {
      return;
    }

    setIsLoading(true);

    const result = await fetchResetPassword(inputPassword, token);
    setResponseStatus(result);
    setIsLoading(false);
  };

  function handleRemoveHightLightError() {
    setResponseStatus({
      success: false,
      point: "",
      msg: "",
    });
  }

  return (
    <div className="container-reset-password-page-main">
      <FullLogo />
      <form onSubmit={handleSubmitdResetPassword}>
        <p>Set new password</p>

        {(responseStatus?.success === false || !responseStatus) && (
          <div
            className={`box-input-reset-passowrd ${responseStatus?.point === "password" && "error"}`}
          >
            <div>
              <label>New Password</label>
              <span>EXP 15min</span>
            </div>
            <input
              type={isShowPassword ? "text" : "password"}
              minLength={8}
              maxLength={50}
              placeholder="Enter a new password"
              onChange={(e) => setInputPassword(e.target.value)}
              onFocus={handleRemoveHightLightError}
              value={inputPassword}
              required
            />
            <p>
              {(responseStatus?.point !== "password" || !responseStatus) &&
                "At least 8 characters"}
              {responseStatus?.point === "password" && responseStatus?.msg}
            </p>
            <EyeIcon
              isShowPassword={isShowPassword}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          </div>
        )}

        {(responseStatus?.success === false || !responseStatus) && (
          <button
            type="submit"
            className={
              isLoading
                ? "btn-submit-reset-password-load"
                : "btn-submit-reset-password"
            }
            disabled={isLoading}
          >
            {isLoading && <LoadButton />}
            {!isLoading && "Save"}
          </button>
        )}
        {responseStatus?.success === true && (
          <div className="container-message-reset-password-success">
            <div>
              <TickIcon />
            </div>
            <span>
              Reset Password Successful{" "}
              <Link className="link-to-login" to="/login">
                Back To Login
              </Link>
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
