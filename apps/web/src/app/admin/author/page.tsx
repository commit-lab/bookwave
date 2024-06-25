import { Box } from "@mui/joy";
import BookContent from "@/features/dummy/components/book-content";
import Sidebar from "@/features/dummy/components/sidebar";

export default function AuthorsPage() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "230px", flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          p: 3,
          width: `calc(100% - 400px)`,
          backgroundColor: "#f5f5f5",
        }}
      >
        <BookContent />
      </Box>
    </Box>
  );
}
