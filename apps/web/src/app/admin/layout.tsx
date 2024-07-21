"use client";

import { Box } from "@mui/joy";
import { useParams } from "next/navigation";
import SideBar from "@/features/admin/components/sidebar";
import TopBar from "@/features/admin/components/topbar";
import { useIsSignedIn } from "@/features/auth/hooks/use-is-signed-in";
import InitialLoading from "@/features/auth/components/initial-loading";
import { useAllBooks } from "@/features/books/queries";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useAllBooks();
  const params = useParams();
  const isSignedIn = useIsSignedIn();
  const isSpecificRoute = params.chapter_number;
  const bookHandle = params.bookHandle;
  const books = data?.books.map((book) => book);
  const bookTitle = books?.find((book) => book.handle === bookHandle)?.title;

  if (!isSignedIn) {
    return <InitialLoading />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {!isSpecificRoute && <TopBar />}
      <Box sx={{ display: "flex", flex: 1 }}>
        {!isSpecificRoute && <SideBar bookTitle={bookTitle} />}
        <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
