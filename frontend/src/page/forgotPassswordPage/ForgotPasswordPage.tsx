// library
import { useState } from "react";

// components
import { LoadButton } from "../../components/load-button/LoadButton";
import { TickIcon } from "../../components/icon-svg/TickIcon";

// api
import { fetchForgotPassword } from "../../api/auth";

// type
import type { ResponseStatus } from "../../types/user-type";

// css
import "./ForgorPasswordPage.css";

export function ForgotPasswordPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [responseStatus, setResponseStatus] = useState<ResponseStatus>();

  const handleSubmitForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setIsLoading(true);
    const result = await fetchForgotPassword(inputEmail);
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
    <div className="container-forgot-password-page-main">
      <form onSubmit={handleSubmitForgotPassword}>
        <div>
          <p>Forgot Password</p>
          <span>Enter your email we will send mail to you</span>
        </div>
        {(responseStatus?.success === false || !responseStatus) && (
          <div
            className={`box-input-email-forgot-password ${responseStatus?.point === "email" && "error"}`}
          >
            <label>Email</label>
            <input
              type="email"
              minLength={8}
              maxLength={50}
              placeholder="Enter your email"
              onChange={(e) => setInputEmail(e.target.value)}
              onFocus={handleRemoveHightLightError}
              value={inputEmail}
              required
            />
            {responseStatus?.point === "email" && <p>{responseStatus?.msg}</p>}
          </div>
        )}
        {(responseStatus?.success === false || !responseStatus) && (
          <button
            type="submit"
            className={
              isLoading
                ? "btn-submit-input-email-load"
                : "btn-submit-input-email"
            }
            disabled={isLoading}
          >
            {isLoading && <LoadButton />}
            {!isLoading && "Submit"}
          </button>
        )}

        {responseStatus?.success === true && (
          <div className="container-send-email-forgot-password-success">
            <div>
              <TickIcon />
            </div>
            <p>We have been have message to your email</p>
          </div>
        )}
      </form>
    </div>
  );
}
