"use client";

import React, { useState } from "react";
import {
  Button,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
} from "@mui/joy";
import { Popover, Dialog } from "@mui/material";

export default function BookOptions() {
  const [popOver, setPopOver] = useState<null | HTMLElement>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopOver(event.currentTarget);
  };

  const handleClose = () => {
    setPopOver(null);
  };

  const handleRenameClick = () => {
    setOpenRenameDialog(true);
    handleClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="solid" onClick={handleClick}>
        :
      </Button>
      <Popover open={Boolean(popOver)} anchorEl={popOver} onClose={handleClose}>
        <Box
          sx={{ display: "flex", flexDirection: "column", p: 2, gap: "10px" }}
        >
          <Button color="neutral" onClick={handleRenameClick}>
            Rename
          </Button>
          <Button color="neutral" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Box>
      </Popover>

      <Dialog
        open={openRenameDialog}
        onClose={() => {
          setOpenRenameDialog(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            p: 8,
          }}
        >
          <DialogTitle>Rename your book</DialogTitle>
          <DialogContent>
            <Input placeholder="Rename Book" />
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              onClick={() => {
                setOpenRenameDialog(false);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            p: 8,
          }}
        >
          <DialogTitle>Are you sure you want to delete your book?</DialogTitle>
          <DialogActions sx={{ gap: 4 }}>
            <Button
              onClick={() => {
                setOpenDeleteDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button color="danger">Delete</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
