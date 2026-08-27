// library
import { useState } from "react";

// components
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import { LoadButton } from "../../../load-button/LoadButton";
import { TickIcon } from "../../../icon-svg/TickIcon";
import { EyeIcon } from "../../../icon-svg/EyeIcon";

// api
import useUser from "../../../../api/user-data/useUser";

// context api
import usePopup from "../../../../context/usePopup";

// type
import type { ResponseStatus } from "../../../../types/user-type";

// css
import "./PopupChangePasswoed.css";

export function PopupChangePasswoed() {
  const { isOpenPopup, isAnimation, closePopup } = usePopup();

  const { isLoadingPost, changePassword } = useUser();

  const [inputOldPassword, setInputOldPassword] = useState<string>();
  const [inputNewPassword, setInputNewPassword] = useState<string>();

  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const [responseStatus, setResponseStatus] = useState<ResponseStatus>();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputNewPassword || !inputOldPassword) {
      return;
    }

    const response = await changePassword(inputOldPassword, inputNewPassword);
    if (!response?.success) {
      setResponseStatus(response);
      return;
    }

    setResponseStatus(response);
  };

  function handleRemoveHightLightError() {
    setResponseStatus({ success: false, point: "", msg: "" });
  }

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "change-password" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleChangePassword}
        className={`container-popup-change-password ${isAnimation}`}
      >
        <div>
          <h2>Renew Password</h2>
          <button
            type="button"
            onClick={() => {
              closePopup();
              setInputNewPassword("");
              setInputOldPassword("");
              handleRemoveHightLightError();
            }}
          >
            <CloseXButton />
          </button>
        </div>
        <div>
          <div
            className={`
                box-input-old-password ${(responseStatus?.point === "old-pwd" || responseStatus?.point === "all") && "error"}`}
          >
            <label>Your Password</label>
            <input
              type={isShowOldPassword ? "text" : "password"}
              minLength={8}
              maxLength={50}
              placeholder="Enter your password"
              onFocus={handleRemoveHightLightError}
              onChange={(e) => setInputOldPassword(e.target.value)}
              value={inputOldPassword}
              required
            />
            <p
              style={{
                display:
                  (responseStatus?.point === "old-pwd" ||
                    responseStatus?.point === "all") &&
                  "error"
                    ? "initial"
                    : "none",
              }}
            >
              {responseStatus?.msg}
            </p>
            <EyeIcon
              isShowPassword={isShowOldPassword}
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            />
          </div>
          <div
            className={`
                box-input-new-password ${(responseStatus?.point === "new-pwd" || responseStatus?.point === "all") && "error"}`}
          >
            <label>New Password</label>
            <input
              type={isShowNewPassword ? "text" : "password"}
              minLength={8}
              maxLength={50}
              placeholder="My new password is..."
              onFocus={handleRemoveHightLightError}
              onChange={(e) => setInputNewPassword(e.target.value)}
              value={inputNewPassword}
              required
            />
            <p
              style={{
                display:
                  (responseStatus?.point === "new-pwd" ||
                    responseStatus?.point === "all") &&
                  "error"
                    ? "initial"
                    : "none",
              }}
            >
              {responseStatus?.msg}
            </p>
            <EyeIcon
              isShowPassword={isShowNewPassword}
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            />
          </div>
        </div>
        {(!responseStatus || !responseStatus.success) && (
          <button
            type="submit"
            className={
              isLoadingPost
                ? "btn-submit-change-password-load"
                : "btn-submit-change-password"
            }
            disabled={isLoadingPost}
          >
            {isLoadingPost && <LoadButton />}
            {!isLoadingPost && "Save"}
          </button>
        )}
        {responseStatus?.success && (
          <div className="message-change-password-success">
            <TickIcon />
            {responseStatus?.msg}
          </div>
        )}
      </form>
    </div>
  );
}
