import React from "react";

export interface ColorIconProps {
  color: string;
}

const ColorIcon: React.FC<ColorIconProps> = (props) => {
  return (
    <div className="color-icon" style={{ backgroundColor: props.color }} />
  );
};

export default ColorIcon;
