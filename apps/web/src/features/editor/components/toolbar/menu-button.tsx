import { ToggleButton } from "@mui/material";
import React from "react";
import MenuButtonTooltip from "@/features/editor/components/toolbar/menu-button-tooltip";

interface MenuButtonProps {
  title: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
  children: React.ReactNode;
}
const MenuButton = (props: MenuButtonProps) => {
  const { title, value, onClick, selected, children } = props;
  return (
    <MenuButtonTooltip title={title}>
      <ToggleButton
        sx={{
          border: 0,
          outline: 1.5,
          width: 50,
          height: 50,
          "&:hover": {
            backgroundColor: "#c2c2c3",
          },
          "&.Mui-selected": {
            color: "black",
            backgroundColor: "#c2c2c3",
          },
        }}
        value={value}
        aria-label={value}
        onClick={onClick}
        selected={selected}
      >
        {children}
      </ToggleButton>
    </MenuButtonTooltip>
  );
};

export default MenuButton;
