import React, { useEffect, useState } from "react";
import "./styles.scss";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import { useTranslation } from "react-i18next";
import { changeProfilePicture } from "./api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { getProfile } from "../../../common/api";
import authService from "../../../services/authService";

const index = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const loadFile = async (event: any) => {
    const file = event.target.files[0];
    const image: any = document.getElementById("output");
    image.src = URL.createObjectURL(file);
    file.path = image.src;
    const response = await changeProfilePicture(file);
    if (response.status === 200) {
      const updatedUser = { ...user, profilePic: response.data.profilePic };
      dispatch(setUser(updatedUser));
      toast.success(`${t("settings.imageChanged")}`);
    } else {
      toast.error(`${t("settings.errorPicture")}`);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && authService.isAuthenticated()) {
        const response = await getProfile();
        if (response?.status < 300) {
          const userData = response.data.user;
          dispatch(setUser(userData));
        } else if(response?.response?.status >= 500) {
          toast.error(`${t("global.serverError")}`);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="profile-pic">
        <label className="-label" htmlFor="file">
          <span className="glyphicon glyphicon-camera" />
          <span>{t("settings.changeImage")}</span>
        </label>
        <input id="file" type="file" onChange={loadFile} />
        <img
          src={user?.profilePic?.secure_url || userImageIcon}
          id="output"
          width={200}
        />
      </div>
    </>
  );
};

export default index;
