import { Box } from "@mui/joy";
import BookContent from "@/components/book-content";
import Sidebar from "@/components/sidebar";

export default function Books() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <BookContent />
    </Box>
  );
}
