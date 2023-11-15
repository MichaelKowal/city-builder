import React from "react";
import "../../styles/input.css";

export interface UIInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  showLabel?: boolean;
  maxLength?: number;
  size?: "sm" | "md" | "lg";
}

const UIInput: React.FC<UIInputProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    ref.current?.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`input ${props.size}`}>
      {props.showLabel && <label>{props.label}</label>}
      <input
        type="text"
        className={isFocused ? "input-focused" : ""}
        ref={ref}
        onClick={handleFocus}
        onBlur={handleBlur}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default UIInput;
