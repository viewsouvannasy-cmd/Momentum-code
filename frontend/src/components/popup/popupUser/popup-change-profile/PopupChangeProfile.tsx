import React, { useState } from "react";

// conponents
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import { LoadButton } from "../../../load-button/LoadButton";

// api
import useUser from "../../../../api/user-data/useUser";

// context api
import usePopup from "../../../../context/usePopup";

// css
import "./PopupChangeProfile.css";

export function PopupChangeProfile() {
  const { isAnimation, isOpenPopup, closePopup } = usePopup();

  const { uploadProfile, getUserInfo, isLoadingPost } = useUser();

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isDragOn, setIsDragOn] = useState(false);

  const [isNotImageFile, setIsNotImageFile] = useState(false);

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || file.type.split("/")[0] !== "image") {
      setIsNotImageFile(true);
      setIsDragOn(false);
      return;
    }

    setIsDragOn(false);
    setInputFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleDragEnter(e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    setIsNotImageFile(false);

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
    await getUserInfo();
    setInputFile(null);
    setPreviewUrl(null);
    closePopup();
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
            className={`container-drag-file ${isDragOn ? "in" : ""} ${isNotImageFile ? "error" : ""}`}
          >
            <p>Put Your File</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onFocus={() => setIsNotImageFile(false)}
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
        {isNotImageFile && <p>accept only image</p>}
        <button
          type="submit"
          className={
            isLoadingPost
              ? "btn-submit-change-profile-load"
              : "btn-submit-change-profile"
          }
          disabled={isLoadingPost}
        >
          {!isLoadingPost && "Save"}
          {isLoadingPost && <LoadButton />}
        </button>
      </form>
    </div>
  );
}
