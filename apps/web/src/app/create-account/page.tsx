"use client";
import * as React from "react";
import {
  FormLabel,
  FormControl,
  Box,
  Input,
  Link,
  Typography,
  CssBaseline,
  Button,
} from "@mui/joy";

export default function LoginFinal() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          padding: "20px",
          background: "#f5faff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            p: 6,
            backgroundColor: "#ffffff",
            border: "2px solid black",
            borderRadius: "5%",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              level="h4"
              component="h1"
              sx={{ fontFamily: "Gloria Hallelujah", mb: 3 }}
            >
              Create your account
            </Typography>

            <Typography
              component="h2"
              sx={{ fontFamily: "Gloria Hallelujah" }}
              level="body-md"
            >
              Let us know some details to get started
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="J.K." fullWidth />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Rowling" fullWidth />
            </FormControl>
          </Box>

          <Box sx={{ display: "grid", placeItems: "center", mt: 3 }}>
            <Button
              variant="solid"
              color="primary"
              sx={{
                width: { xs: "100% ", sm: "50%", md: "50%", lg: "50%" },
                fontFamily: "Gloria Hallelujah",
                p: 3,
              }}
            >
              Create Account
            </Button>
            <Typography
              endDecorator={<Link href="/books">Dashboard</Link>}
              fontSize="sm"
              sx={{ alignSelf: "center", mt: 2 }}
            >
              Already have an account?
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
