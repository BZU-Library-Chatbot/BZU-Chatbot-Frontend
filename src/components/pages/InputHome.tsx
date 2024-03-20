import React from "react";
import HomeInputCss from "../pages/InputHome.module.scss";

interface InputProps {
  type?: string;
  id: string;
  name: string;
  title: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  touched: { [key: string]: boolean };
}

const InputHome: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  errors,
  onBlur,
  touched,
  placeholder,
}) => {
  return (
    <>
      <>
        <div className="input-group mb-3">
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={HomeInputCss.message}
            id={id}
          />
          {touched[name] && errors[name] && (
            <p className="text text-danger"> {errors[name]} </p>
          )}
        </div>
      </>
    </>
  );
};

export default InputHome;
