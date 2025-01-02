import React, { useState } from "react";
import Switch from "@mui/material/Switch";

interface SwitchProps {
  setIsUser: (isAdmin: boolean) => void;
}

const CustomSwitch: React.FC<SwitchProps> = ({ setIsUser }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitch = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setIsUser(newValue);
  };

  return (
    <div className="switch-container">
      <Switch checked={isChecked} onChange={handleSwitch} />
    </div>
  );
};

export default CustomSwitch;
