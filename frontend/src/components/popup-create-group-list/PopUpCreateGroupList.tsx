import React, { useState } from "react";
import { CloseXButton } from "../close-x-button/CloseXButton";
import { rbgaFormot } from "../../utils/rgbaFormart.ts";
import { LoadButton } from "../load-button/LoadButton.tsx";
import useGropList from "../../api/group-lists/useGroupList.ts";

import "./PopUpCreateGroupList.css";

interface PopCreateGroupListProp {
  isOpenNavBar: string;
  isAnimation: string;
  setIsAnimation: (value: string) => void;
  isOpenPopup: boolean;
  setIsOpenPopup: (value: boolean) => void;
}

export function PopUpCreateGroupList({
  isOpenNavBar,
  isAnimation,
  setIsAnimation,
  isOpenPopup,
  setIsOpenPopup,
}: PopCreateGroupListProp) {
  const [isPickColor, setIsPickColor] = useState("#2d7ffb");
  const [inputNameGroupList, setInputNameGroupList] = useState("");

  const { isLoadingPost, createGroup } = useGropList();

  function handleClosePopup() {
    document.body.style.overflow = "unset";
    setIsAnimation("close");
    setTimeout(() => {
      setIsOpenPopup(false);
      setInputNameGroupList("");
    }, 200);
  }

  const handleCreateGroupList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rgba = rbgaFormot(isPickColor);
    await createGroup(inputNameGroupList, rgba);
    handleClosePopup();
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup ? "flex" : "none",
        paddingLeft: isOpenNavBar === "open" ? "263px" : "43px",
      }}
    >
      <form
        className={`container-popup-create-group-list ${isAnimation}`}
        onSubmit={handleCreateGroupList}
      >
        <div>
          <h2>Create Group List</h2>
          <button type="button" onClick={handleClosePopup}>
            <CloseXButton />
          </button>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            minLength={1}
            maxLength={50}
            placeholder="My group name is...."
            onChange={(e) => setInputNameGroupList(e.target.value)}
            value={inputNameGroupList}
            required
          />
        </div>
        <div>
          <label>Color</label>
          <div>
            <input
              type="color"
              onChange={(e) => setIsPickColor(e.target.value)}
              value={isPickColor}
              required
            />
            <button
              type="submit"
              className={
                !isLoadingPost
                  ? "create-group-list-btn"
                  : "create-group-list-btn-load"
              }
            >
              {!isLoadingPost ? "Create" : <LoadButton />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
