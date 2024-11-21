"use client";
import { ModalState, toggleModal } from "@/store/modelSlice";
import { styled } from "@mui/material/styles";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
export interface IRootState {
  modal: ModalState;
}
interface ICustomizedModelProps {
  title: string;
  content: React.ReactElement;
  updateOpen?: boolean;
  setUpdateOpen?: () => void;
  type?: string;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const CustomizedModel: React.FC<ICustomizedModelProps> = ({
  content,
  title,
  setUpdateOpen,
  updateOpen,
  type = "add",
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: IRootState) => state.modal.isOpen);
  const handleClose = () => {
    if (type === "update" && setUpdateOpen) {
      setUpdateOpen(); // Close the "update" modal by setting updateOpen to false
    } else {
      dispatch(toggleModal()); // Toggle the modal visibility via Redux for "add" type
    }
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      open={type === "update" ? updateOpen || false : isOpen || false}
    >
      <Box sx={{ background: "#efd1b3" }}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ background: "#f4f2dd" }}>
        {content}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default CustomizedModel;
