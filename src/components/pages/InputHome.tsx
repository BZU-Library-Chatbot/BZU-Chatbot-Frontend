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
  message: string;
  handleSendMessage: () => void;
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
  message,
  handleSendMessage,
}) => {
  const handleKeyPress = (event: any) => {
    if (event.key == "Enter" && message.trim() != "") {
      handleSendMessage();
    }
  };
  return (
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
      <div
        className={HomeInputCss.submit}
        onClick={message.trim() !== "" ? handleSendMessage : undefined}
        onKeyDown={handleKeyPress}
        style={{
          cursor: message.trim() === "" ? "not-allowed" : "pointer",
        }}
      >
        <i className="fa-regular fa-paper-plane"></i>
      </div>
    </div>
  );
};

export default InputHome;
