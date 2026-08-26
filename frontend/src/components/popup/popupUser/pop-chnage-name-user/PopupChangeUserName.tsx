// library
import { useState } from "react";

// components
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import { LoadButton } from "../../../load-button/LoadButton";

// api
import useUser from "../../../../api/user-data/useUser";

// context api
import usePopup from "../../../../context/usePopup";

// type
import type { ResponseStatus } from "../../../../types/user-type";

// css
import "./PopupChangeUserName.css";

export function PopupChangeUserName() {
  const [inputName, setInputName] = useState("");

  const [responseStatus, setResponseState] = useState<ResponseStatus>();

  const { isOpenPopup, isAnimation, closePopup } = usePopup();

  const { changeUserName, isLoadingPost, getUserInfo, userData } = useUser();

  const handleChangeNameUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData[0]?.user_name === inputName) {
      setResponseState({ success: false, msg: "this it already be your name" });
      return;
    }

    const response = await changeUserName(inputName);
    setResponseState(response);
    if (!response?.success) {
      return;
    }
    await getUserInfo();
    setInputName("");
    closePopup();
  };

  function handleRemoveHightlightError() {
    setResponseState({ success: true });
  }

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "change-user-name" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleChangeNameUser}
        className={`container-popup-change-user-name ${isAnimation}`}
      >
        <div>
          <h2>Rename user</h2>
          <button
            type="button"
            onClick={() => {
              setInputName("");
              closePopup();
            }}
          >
            <CloseXButton />
          </button>
        </div>
        <div>
          <label>New Name</label>
          <input
            className={`input-change-user-name ${responseStatus?.success === false ? "error" : ""}`}
            type="text"
            minLength={2}
            maxLength={100}
            onFocus={handleRemoveHightlightError}
            placeholder="My new name is..."
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            required
          />
          <p
            style={{
              display: responseStatus?.success === false ? "initial" : "none",
            }}
          >
            {responseStatus?.msg}
          </p>
        </div>
        <button
          type="submit"
          className={
            isLoadingPost
              ? "btn-submit-change-user-name-load"
              : "btn-submit-change-user-name"
          }
          disabled={isLoadingPost}
        >
          {isLoadingPost && <LoadButton />}
          {!isLoadingPost && "Save"}
        </button>
      </form>
    </div>
  );
}
