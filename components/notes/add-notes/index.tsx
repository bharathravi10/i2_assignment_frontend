"use client";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, TextareaAutosize } from "@mui/material";
import CustomizedInput from "@/components/common/input-field";
import { postNotes } from "@/utils/api";
import { showSnackbar } from "@/store/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/modelSlice";
import { AddNotesConstants } from "../notes-constants";
import { setNotes } from "@/store/notesSlice";

const AddNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state:any) => state.getNotes.notes)
  const validationSchema = Yup.object({
    title: Yup.string().required(AddNotesConstants.TITLE_ERROR_MSG),
    notes: Yup.string().required(AddNotesConstants.NOTES_ERROR_MSG),
  });
  // Initial values for the form
  const initialValues = {
    title: "",
    notes: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make the POST request
        const response = await postNotes(
          values.title,
          values.notes,
        );
        if (response?.status === 201) {
          dispatch(
            showSnackbar({
              message: AddNotesConstants.SUCCESS_MSG,
              severity: "success",
            })
          );
          dispatch(setNotes([...notes, response.data]));
          dispatch(toggleModal());
        }
      } catch (error) {
        dispatch(
          showSnackbar({
            message: AddNotesConstants.FAILURE_MSG,
            severity: "error",
          })
        );
        Promise.reject(error)
      }
    },
  });
  return (
    <Box
      sx={{ minWidth: "350px" }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <CustomizedInput
        htmlFor="title"
        id="title"
        label="Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        placeholder="first"
      />
      <TextareaAutosize
        minRows={12}
        style={{
          width: "100%",
          border: "1px solid brown",
          borderRadius: "10px",
        }}
        id="notes"
        name="notes"
        placeholder="Type here..."
        onChange={formik.handleChange}
        value={formik.values.notes}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Button
          type="submit"
          sx={{
            padding: "6px 20px !important",
            background: "green",
            borderRadius: "10px",
            color: "#FFF",
            marginRight: "10px",
          }}
        >
          {AddNotesConstants.ADD}
        </Button>
        <Button
          sx={{
            padding: "6px 20px !important",
            background: "red",
            borderRadius: "10px",
            color: "#FFF",
          }}
          onClick={() => dispatch(toggleModal())}
        >
          {AddNotesConstants.CANCEL}
        </Button>
      </Box>
    </Box>
  );
};

export default AddNotes;
