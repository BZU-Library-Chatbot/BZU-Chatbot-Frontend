import React from "react";
import "./styles.scss";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import { useTranslation } from "react-i18next";

interface IProps {
  userImage?: string;
}

const index: React.FC<IProps> = ({ userImage }) => {
  const {t} = useTranslation();
  const loadFile = function (event: any) {
    const image: any = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  return (
    <>
      <div className="profile-pic">
        <label className="-label" htmlFor="file">
          <span className="glyphicon glyphicon-camera" />
          <span>{t("settings.changeImage")}</span>
        </label>
        <input id="file" type="file" onChange={loadFile} />
        <img src={userImage || userImageIcon} id="output" width={200} />
      </div>
    </>
  );
};

export default index;
