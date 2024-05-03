import React from "react";
import styles from "./InputHome.module.scss";

interface InputProps {
  type?: string;
  id: string;
  name: string;
  title: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  message: string;
  handleSendMessage: () => void;
}

const InputHome: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
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
    <div className={`input-group ${styles.container}`}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.message}
        id={id}
      />
      <div
        className={styles.submit}
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
