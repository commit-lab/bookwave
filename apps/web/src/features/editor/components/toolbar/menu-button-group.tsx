import { ToggleButtonGroup } from "@mui/joy";

interface MenuButtonGroupProps {
  ariaLabel: string;
  children: React.ReactNode;
}

const MenuButtonGroup = (props: MenuButtonGroupProps) => {
  const { ariaLabel, children } = props;
  return (
    <ToggleButtonGroup
      variant="plain"
      spacing={1.5}
      aria-label={ariaLabel}
      sx={{ borderRadius: 0 }}
    >
      {children}
    </ToggleButtonGroup>
  );
};

export default MenuButtonGroup;
