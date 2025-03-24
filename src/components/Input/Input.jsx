import React from "react";
import "./Input.scss";

// export interface InputProps {
//   type?: string;
//   name?: string;
//   value?: string;
//   placeholder?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   disabled?: boolean;
//   required?: boolean;
//   className?: string;
//   error?: string;
//   label?: string;
//   icon?: React.ReactNode;
//   iconPosition?: "left" | "right";
// }

const Input = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  className = "",
  error,
  label,
  icon,
  iconPosition = "right",
}) => {
  const inputClasses = `
    input 
    ${error ? "input--error" : ""} 
    ${icon ? `input--with-icon input--icon-${iconPosition}` : ""} 
    ${className}
  `;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />
        {icon && (
          <span className={`input-icon input-icon--${iconPosition}`}>
            {icon}
          </span>
        )}
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;
