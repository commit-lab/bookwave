import { Box, Table, Typography } from "@mui/joy";
import { Menu } from "@mui/icons-material";
import { data } from "@/constants/temp-data";
import CreateBook from "@/features/dummy/components/create-book";

export default function BookContent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        minHeight: "95vh",
      }}
    >
      {data.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            You don&apos;t have any books!
          </Typography>
          <CreateBook />
        </Box>
      )}
      {data.map((book) => (
        <Box key={book.id}>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Chapters</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{book.title}</td>
                <td>{book.chapters.length}</td>
                <td>{book.state}</td>
                <td>
                  <Menu />
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );
}
