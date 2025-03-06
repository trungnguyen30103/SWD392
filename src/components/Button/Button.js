import React from "react";
import "./Button.scss";

// export interface ButtonProps {
//   children: React.ReactNode;
//   variant?: "primary" | "secondary" | "outline" | "text";
//   size?: "sm" | "md" | "lg";
//   onClick?: () => void;
//   type?: "button" | "submit" | "reset";
//   disabled?: boolean;
//   fullWidth?: boolean;
//   className?: string;
//   icon?: React.ReactNode;
//   iconPosition?: "left" | "right";
// }

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const buttonClasses = `
    button 
    button--${variant} 
    button--${size} 
    ${fullWidth ? "button--full-width" : ""} 
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      <span className="button__text">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};

export default Button;
