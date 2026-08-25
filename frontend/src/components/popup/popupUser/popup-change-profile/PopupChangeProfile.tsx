import React, { useState } from "react";

// conponents
import { CloseXButton } from "../../../close-x-button/CloseXButton";

// api
import useUser from "../../../../api/user-data/useUser";

// context api
import usePopup from "../../../../context/usePopup";

// css
import "./PopupChangeProfile.css";

export function PopupChangeProfile() {
  const { isAnimation, isOpenPopup, closePopup } = usePopup();

  const { uploadProfile } = useUser();

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isDragOn, setIsDragOn] = useState(false);

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setInputFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleDragEnter(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();

    setIsDragOn(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();

    setIsDragOn(false);
  }

  const handleUploadProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputFile) {
      return;
    }

    await uploadProfile(inputFile);
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup === "change-profile" ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleUploadProfile}
        className={`container-popup-change-profile-user ${isAnimation}`}
      >
        <div>
          <h2>Change New Profile</h2>
          <button type="button" onClick={closePopup}>
            <CloseXButton />
          </button>
        </div>
        {!previewUrl && (
          <div
            className="container-drag-file"
            style={{
              borderColor: isDragOn
                ? "var(--main-opponent-color)"
                : "var(--border-card-color)",
            }}
          >
            <p>Put Your File</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              required
            />
          </div>
        )}
        {previewUrl && (
          <div className="container-preivew-new-profile">
            <div>
              <img src={previewUrl} />
            </div>
            <button
              type="button"
              onClick={() => {
                setPreviewUrl(null);
                setInputFile(null);
                setIsDragOn(false);
              }}
            >
              reset
            </button>
          </div>
        )}
        <button type="submit" className="btn-submit-change-profile">
          Save
        </button>
      </form>
    </div>
  );
}
