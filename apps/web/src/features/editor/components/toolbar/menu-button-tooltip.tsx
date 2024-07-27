import { Tooltip } from "@mui/joy";

const MenuButtonTooltip = ({ children, title = "" }) => {
  return (
    <Tooltip
      color="primary"
      placement="top"
      size="sm"
      variant="soft"
      title={title}
      sx={{ fontFamily: "Gloria Hallelujah" }}
    >
      {children}
    </Tooltip>
  );
};

export default MenuButtonTooltip;
