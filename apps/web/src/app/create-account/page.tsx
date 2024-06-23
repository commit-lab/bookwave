"use client";
import * as React from "react";
// import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

export default function LoginFinal() {
  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1" sx={{ textAlign: "center" }}>
            <b>Create Your Account</b>
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
            Let us know some basic details to get started
          </Typography>
        </div>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            // html input attribute
            name="text"
            type="text"
            placeholder="john"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="text"
            type="text"
            placeholder="doe"
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }}>Create Account</Button>
        <Typography
          endDecorator={<Link href="/books">Dashboard</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Already have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
