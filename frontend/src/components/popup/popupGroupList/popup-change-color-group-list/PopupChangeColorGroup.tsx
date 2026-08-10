import { useState } from "react";
import { rgbStringToHex } from "../../../../utils/hexFormat.ts";
import { rbgaFormot } from "../../../../utils/rgbaFormart.ts";
import { CloseXButton } from "../../../close-x-button/CloseXButton";
import { LoadButton } from "../../../load-button/LoadButton.tsx";
import useGropList from "../../../../api/group-lists/useGroupList.ts";
import useGetData from "../../../../api/todo-data/useGetData.ts";

import "./PopupChangeColorGroup.css";

interface PopupChangeColorGroupProp {
  groupId: string | undefined;
  group_name: string | undefined;
  group_color: string | undefined;
  isOpenPopup: string | null;
  isAnimation: string;
  setIsOpenPopup: (param: string | null) => void;
  setIsAnimation: (param: string) => void;
}

export function PopupChangeColorGroup({
  groupId,
  group_name,
  group_color,
  isOpenPopup,
  isAnimation,
  setIsOpenPopup,
  setIsAnimation,
}: PopupChangeColorGroupProp) {
  const { isLoadingPost, changeColorGroup } = useGropList();
  const { getDataTodo } = useGetData();

  const [inputColor, setInputColor] = useState<string | undefined>(
    rgbStringToHex(group_color),
  );

  function handleClosePopup() {
    setIsAnimation("close");
    setTimeout(() => {
      setIsOpenPopup(null);
    }, 200);
  }

  function handleInputColor(color: string) {
    setInputColor(color);
  }

  const handleChangeColor = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const rbga = rbgaFormot(inputColor);
    if (rbga && groupId) {
      await changeColorGroup(rbga, groupId);
      await getDataTodo();
      handleClosePopup();
    }
  };

  return (
    <div
      className={`container-background-overlay-popup ${isAnimation}`}
      style={{
        display: isOpenPopup ? "flex" : "none",
      }}
    >
      <form
        onSubmit={handleChangeColor}
        className={`container-change-color-group-popup ${isAnimation}`}
      >
        <button type="button" onClick={handleClosePopup}>
          <CloseXButton />
        </button>
        <div className="container-show-example-change-color">
          <div
            style={{
              backgroundColor: rbgaFormot(inputColor),
            }}
          >
            {group_name}
          </div>
          <span>{rbgaFormot(inputColor)}</span>
        </div>
        <div className="container-input-color-and-save-btn">
          <div>
            <p>Change Color</p>
            <span>we will down opacity of color about 30 % for contrast</span>
            <input
              type="color"
              onChange={(e) => handleInputColor(e.target.value)}
              value={inputColor}
              required
            />
          </div>
          <button
            type="submit"
            className={
              isLoadingPost
                ? `btn-save-change-color-group-list-load`
                : "btn-save-change-color-group-list"
            }
            disabled={isLoadingPost}
          >
            {isLoadingPost ? <LoadButton /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
