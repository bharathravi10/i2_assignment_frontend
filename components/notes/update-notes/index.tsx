"use client";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, TextareaAutosize } from "@mui/material";
import { ICardContentProps } from "../notes-details/CardContent";
import { deleteNotes, updateNotes } from "@/utils/api";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/snackbarSlice";
import { AddNotesConstants, UpdateNotesConstants } from "../notes-constants";

const UpdateNotes: React.FC<ICardContentProps> = ({ note, toggleUpdate }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    title: Yup.string().required(UpdateNotesConstants.TITLE_ERROR_MSG),
    notes: Yup.string().required(UpdateNotesConstants.NOTES_ERROR_MSG),
  });
  // Initial values for the form
  const initialValues = {
    title: "",
    notes: "",
    userId: "",
    noteId: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      try {
        const response = await updateNotes(values.userId, values.noteId, {
          note_title: values.title,
          note_content: values.notes,
        });
        if (response?.status === 200) {
          dispatch(
            showSnackbar({
              message: UpdateNotesConstants.SUCCESS_MSG,
              severity: "success",
            })
          );
          toggleUpdate && toggleUpdate();
        }
      } catch (error) {
        dispatch(
          showSnackbar({
            message: AddNotesConstants.FAILURE_MSG,
            severity: "error",
          })
        );
      }
    },
  });
  const deleteNote = async () => {
    try {
      const res = await deleteNotes(formik.values.userId, formik.values.noteId);

      if (res?.status === 200) {
        dispatch(
          showSnackbar({
            message: UpdateNotesConstants.DELETE_SUCCESS_MSG,
            severity: "success",
          })
        );
        toggleUpdate && toggleUpdate();
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: AddNotesConstants.FAILURE_MSG,
          severity: "error",
        })
      );
    }
  };
  useEffect(() => {
    if (note._id) {
      formik.setValues({
        title: note.note_title,
        notes: note.note_content,
        userId: note.user_id,
        noteId: note._id,
      });
    }
  }, [note]);
  return (
    <Box
      sx={{ minWidth: "350px" }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
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
        value={formik.values.notes}
        onChange={formik.handleChange}
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
          {UpdateNotesConstants.UPDATE}
        </Button>
        <Button
          sx={{
            padding: "6px 20px !important",
            background: "red",
            borderRadius: "10px",
            color: "#FFF",
          }}
          onClick={deleteNote}
        >
          {UpdateNotesConstants.DELETE}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateNotes;
