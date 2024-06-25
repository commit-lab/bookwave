import { Typography } from "@mui/joy";
import { AppBar } from "@mui/material";
import Link from "next/link";

export default function TopBar() {
  return (
    <AppBar position="static" sx={{ padding: 2, backgroundColor: "#F4F4F4" }}>
      <Typography textColor="#0B6BCB" level="h4">
        <Link href="/">Bookwave</Link>
      </Typography>
    </AppBar>
  );
}
