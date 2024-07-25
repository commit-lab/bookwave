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
import { Popover, Dialog, CircularProgress } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useDeleteChapterMutation } from "@/features/chapters/mutations";

export default function ChapterOptions({ chapterId }: { chapterId: string }) {
  const [popOver, setPopOver] = useState<null | HTMLElement>(null);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const deleteChapterMutation = useDeleteChapterMutation();

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

  const openDeleteOption = () => {
    setOpenDeleteDialog(true);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleDeleteClick = async () => {
    setOpenDeleteDialog(true);
    await deleteChapterMutation.mutateAsync({ chapterId });
    handleClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box onClick={handleClick}>
        <MoreVert sx={{ cursor: "pointer" }} />
      </Box>
      <Popover open={Boolean(popOver)} anchorEl={popOver} onClose={handleClose}>
        <Box
          sx={{ display: "flex", flexDirection: "column", p: 2, gap: "10px" }}
        >
          <Button color="neutral" onClick={handleRenameClick}>
            Rename
          </Button>
          <Button color="neutral" onClick={handleEditClick}>
            Edit
          </Button>
          <Button color="danger" onClick={openDeleteOption}>
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
          <DialogTitle>Rename your chapter</DialogTitle>
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
        open={openEditDialog}
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
          <DialogTitle>Edit your chapter</DialogTitle>
          <DialogContent>
            <Input placeholder="Edit Chapter" />
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              onClick={() => {
                setOpenEditDialog(false);
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
          <DialogTitle>
            Are you sure you want to delete this chapter?
          </DialogTitle>
          <DialogActions sx={{ gap: 4 }}>
            <Button
              onClick={() => {
                setOpenDeleteDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={handleDeleteClick}
              disabled={deleteChapterMutation.isPending}
            >
              {deleteChapterMutation.isPending ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
