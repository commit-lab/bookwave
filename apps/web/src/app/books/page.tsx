import {
  Box,
  Button,
  Sheet,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
} from "@mui/joy";
import Link from "next/link";
import { dummyData } from "@/features/books/dummy-data"; // Adjust this import path as needed

export default function BooksPage() {
  const books = dummyData.books;

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
            height: "100%",
          }}
        >
          {books.length > 0 ? (
            <>
              <Typography level="h4" component="h2" sx={{ mb: 2 }}>
                Your Books
              </Typography>
              <List>
                {books.map((book) => (
                  <ListItem key={book.id}>
                    <ListItemButton
                      component={Link}
                      href={`/books/${book.authorHandle}/${book.bookHandle}`}
                    >
                      <ListItemContent>
                        <Typography>{book.title}</Typography>
                        <Typography>by {book.author}</Typography>
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography level="h4" component="h2" sx={{ mb: 2 }}>
                You don't have any books!
              </Typography>
              <Button variant="solid" color="primary">
                CREATE ONE TO GET STARTED
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
