import { useState } from "react";
import { CloseXButton } from "../close-x-button/CloseXButton";
import { rbgFormot } from "../../utils/rgbFormart.ts";

interface PopCreateGroupListProp {
  isAnimation: string;
  setIsAnimation: (value: string) => void;
  isOpenPopup: boolean;
  setIsOpenPopup: (value: boolean) => void;
}

export function PopUpCreateGroupList({
  isAnimation,
  setIsAnimation,
  isOpenPopup,
  setIsOpenPopup,
}: PopCreateGroupListProp) {
  const [isPickColor, setIsPickColor] = useState<string>("");

  function handlePickColor(hex: string) {
    // change hex format to rgb format
    const rgb = rbgFormot(hex);

    setIsPickColor(rgb);
  }

  function handleClosePopup() {
    document.body.style.overflow = "unset";
    setIsAnimation("close");
    setTimeout(() => {
      setIsOpenPopup(false);
    }, 200);
  }

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup ? "flex" : "none",
      }}
    >
      <form className={`container-popup-create-group-list ${isAnimation}`}>
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
            required
          />
        </div>
        <div>
          <label>Color</label>
          <div>
            <input
              type="color"
              onChange={(e) => handlePickColor(e.target.value)}
              value={isPickColor}
              required
            />
            <button>Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}
