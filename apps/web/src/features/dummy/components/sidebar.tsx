import { Box, Button, Typography } from "@mui/joy";

export default function SideBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        alignItems: "center",
      }}
    >
      <Typography>Books</Typography>
      <Button sx={{ width: "fixed" }}>Your account</Button>
    </Box>
  );
}
