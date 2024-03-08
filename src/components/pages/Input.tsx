import React from 'react';
import InputCss from "./Input.module.scss";

interface InputProps {
  type?: string;
  id: string;
  name: string;
  title: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { [key: string]: boolean };
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  name,
  // title,
  value,
  onChange,
  errors,
  onBlur,
  touched,
  placeholder
}) => {
  return (
    <>
      {/* <div className="input-group mb-3"> */}
        {/* <label htmlFor={id}>{title}</label> */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={InputCss.input}
          id={id}
          placeholder={placeholder}
        />
        {touched[name] && errors[name] && (
          <p className="text text-danger"> {errors[name]} </p>
        )}
      {/* </div> */}
    </>
  );
};

export default Input;
// import React from 'react'

// export default function input({type='text', id,name, title,value,onChange,errors,onBlur,touched}) {
//   return (
//     <>
//     <div className="input-group mb-3">

//         <label htmlFor={id}>{title}</label>
//         <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur}  class="form-control" id={id} />
//         {touched[name]&&errors[name] && <p className='text text-danger'> {errors[name]} </p>}
//      </div>
//     </>
//   )
// }