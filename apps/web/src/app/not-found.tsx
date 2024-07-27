import { Box, Button, Card, CardContent, Typography } from "@mui/joy";
import Image from "next/image";

const defaultError = "404 (Not Found)";
const defaultMessage =
  "Oops! This is awkward... You are looking for something that doesn't exist";
const defaultButtonText = "Go back, my friend";

const CustomErrorPage = ({
  errorTitle = defaultError,
  errorMessage = defaultMessage,
  buttonText = defaultButtonText,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        background: "#f5faff",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          p: 6,
          border: "2px solid black",
          borderRadius: "5%",
          mx: { xs: "1rem" },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              level="h1"
              component="h1"
              sx={{ fontFamily: "Gloria Hallelujah", mb: 3 }}
            >
              {errorTitle}
            </Typography>

            <Typography
              component="h2"
              sx={{ fontFamily: "Gloria Hallelujah", mb: 3 }}
              level="body-md"
            >
              {errorMessage}
            </Typography>
            <Image
              src="/images/app-icon.png"
              alt="app icon"
              width={100}
              height={100}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="solid"
              color="primary"
              sx={{
                width: { xs: "100% ", sm: "50%", md: "50%", lg: "50%" },
                fontFamily: "Gloria Hallelujah",
                p: 3,
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomErrorPage;
