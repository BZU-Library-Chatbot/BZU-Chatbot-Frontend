import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import ProfileImage from "../profileImage/index";
import Input from "../../pages/Input";
import { changePassword } from "./api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { changePasswordSchema } from "../validation/validate";
import { SelectButton } from "primereact/selectbutton";
import languageService from "../../../services/languageService";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../common/api";
import { setUser } from "../../../redux/userSlice";
import authService from "../../../services/authService";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  cPassword: string;
}

const index = () => {
  const { user } = useSelector((state: any) => state.user);
  const { t }: any = useTranslation();
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  };

  const onSubmit = async (values: FormValues) => {
    const response = await changePassword(values);
    if (response?.status < 300) {
      toast.success(`${t("settings.passwordChanged")}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response?.response?.status < 500) {
      toast.error(t("settings.differentPassword"), {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`${t("global.serverError")}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && authService.isAuthenticated()) {
        const response = await getProfile();
        if (response?.status < 300) {
          const userData = response.data.user;
          dispatch(setUser(userData));
        } else if (response?.status >= 500) {
          toast.error(`${t("global.serverError")}`, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    };
    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: changePasswordSchema,
  });

  const inputs = [
    {
      id: "oldPassword",
      type: "oldPassword",
      name: "oldPassword",
      title: `${t("login.oldPassword")}`,
      placeholder: `${t("settings.oldPassword")}`,
      value: formik.values.oldPassword,
      onChange: formik.handleChange,
    },
    {
      id: "newPassword",
      type: "newPassword",
      name: "newPassword",
      title: `${t("settings.newPassword")}`,
      placeholder: `${t("settings.newPassword")}`,
      value: formik.values.newPassword,
      onChange: formik.handleChange,
    },
    {
      id: "cPassword",
      type: "cPassword",
      name: "cPassword",
      title: `${t("settings.confirmPassword")}`,
      placeholder: `${t("settings.confirmPassword")}`,
      value: formik.values.cPassword,
      onChange: formik.handleChange,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <div className="form-group custom-input d-flex flex-column">
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        title={input.title}
        value={input.value}
        key={index}
        placeholder={input.placeholder}
        errors={formik.errors}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
      />
    </div>
  ));

  const options = ["en", "ar"];
  const [language, setLanguage] = useState(languageService.loadLanguage());

  useEffect(() => {
    const changeLanguage = async () => {
      languageService.saveLanguage(language);
      await i18n.changeLanguage(language);
    };
    changeLanguage();
    if (languageService.loadLanguage() === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [language]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            <div className="my-4">
              <div className="row mt-5 align-items-center">
                <div className="col-md-3 text-center mb-5">
                  <div className="avatar avatar-xl">
                    <ProfileImage />
                  </div>
                </div>
                <div className="col">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <h4 className="mb-1">
                        {user?.userName || t("settings.johnDoe")}
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <p className="text-muted">
                      {user?.email || t("settings.exampleEmail")}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="d-flex justify-content-between align-items-center w-57">
                <h4>{t("settings.language")}</h4>
                <div dir="ltr">
                  <SelectButton
                    value={language}
                    onChange={(e: any) => setLanguage(e.value)}
                    options={options}
                  />
                </div>
              </div>
              <hr className="mt-4" />
              <form className="row" onSubmit={formik.handleSubmit}>
                <div className="col-md-6">{renderInputs}</div>
                <div className="col-md-6 requirements">
                  <p className="mb-2">{t("settings.passwordRequirements")}</p>
                  <p className="small text-muted mb-2">
                    {t("settings.requirementsText")}
                  </p>
                  <ul className="small text-muted pl-4 mb-0">
                    {t("settings.requirements", { returnObjects: true }).map(
                      (requirement: any, index: any) => (
                        <li key={index}>{requirement}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn-custom"
                    disabled={!formik.isValid}
                  >
                    {t("settings.change")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
