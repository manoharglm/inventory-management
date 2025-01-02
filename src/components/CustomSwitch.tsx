import React, { useState } from "react";
import { Switch, FormControlLabel, Typography, Box } from "@mui/material";

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
    <Box display="flex" alignItems="center" className="switch-container">
      <Typography variant="body1" color="textSecondary" sx={{ marginRight: 2 }}>
        Admin
      </Typography>
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={handleSwitch} />}
        label=" "
      />
      <Typography variant="body1" color="textSecondary">
        User
      </Typography>
    </Box>
  );
};

export default CustomSwitch;
