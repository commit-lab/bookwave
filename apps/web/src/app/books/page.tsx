import { Box, Button, Sheet, Typography } from "@mui/joy";
import Link from "next/link";

export default function BooksPage() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f0f0f0" }}>
      {/* Navigation Sidebar */}
      <Sheet
        sx={{
          width: "240px",
          bgcolor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography level="h4" component="h1">
            Bookwave
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Typography level="h6" component="h2">
            <Link href="/books/toc">Table of Contents</Link>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Typography level="h6" component="h2">
            Books
          </Typography>
        </Box>
        <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography level="body2" component="p">
            Your Account
          </Typography>
        </Box>
      </Sheet>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            bgcolor: "#ffffff",
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography level="h4" component="h2" sx={{ mb: 2 }}>
            You don't have any books!
          </Typography>
          <Button variant="solid" color="primary">
            CREATE ONE TO GET STARTED
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
