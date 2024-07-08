import { type Metadata } from "next";
import { Box } from "@mui/joy";
import SideBar from "@/features/admin/components/sidebar";
import TopBar from "@/features/admin/components/topbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Bookwave Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <SideBar />
        <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
