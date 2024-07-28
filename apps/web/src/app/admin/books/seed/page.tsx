"use client";
import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "@mui/joy";
import { useState } from "react";
import { apiClient } from "@/lib/api/api-client";

function SeedDatabase() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { isLoading, isError, refetch, data } = useQuery<string>({
    queryKey: ["seed"],
    queryFn: async () => {
      const response = apiClient.books.seed();
      return response;
    },
    enabled: false,
  });

  const handleClick = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      void refetch();
    }
  };

  if (isLoading) return <Typography level="h1">Seeding your DB....</Typography>;
  if (isError) return <Typography level="h1">Error seeding DB.</Typography>;

  return (
    <Button onClick={handleClick} disabled={isButtonClicked}>
      {data ? "Seeded" : "Click to Seed"}
    </Button>
  );
}

export default SeedDatabase;
