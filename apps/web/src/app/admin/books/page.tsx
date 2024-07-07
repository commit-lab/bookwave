import { Box } from "@mui/joy";
import BookContent from "@/components/book-content";

export default function Books() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <BookContent />
    </Box>
  );
}
