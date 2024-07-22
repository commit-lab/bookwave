"use client";

import { Box } from "@mui/joy";
import { useParams } from "next/navigation";
import SideBar from "@/features/admin/components/sidebar";
import TopBar from "@/features/admin/components/topbar";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import InitialLoading from "@/features/auth/components/initial-loading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const isSpecificRoute = Boolean(params.chapterNumber);
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    return <InitialLoading />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {!isSpecificRoute && <TopBar />}
      <Box sx={{ display: "flex", flex: 1 }}>
        {!isSpecificRoute && <SideBar />}
        <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
