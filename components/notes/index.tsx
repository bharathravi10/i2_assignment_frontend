"use client";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomizedModel from "../common/model";
import AddNotes from "./add-notes";
import UpdateNotes from "./update-notes";
import NotesCard from "./notes-details";
import { AddNotesConstants, UpdateNotesConstants } from "./notes-constants";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "@/store/notesSlice";
import { getAllNotesData } from "@/utils/api";

export interface INotes {
  _id: string;
  note_title: string;
  note_content: string;
  user_id: string;
  last_update: Date;
}
const KeepNotesComponent = () => {
  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.getNotes.notes);

  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [noteDetails, setNoteDetails] = useState<INotes>({
    _id: "",
    user_id: "",
    note_title: "",
    note_content: "",
    last_update: new Date(),
  });
  const toggleUpdate = () => {
    setUpdateOpen(!updateOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await getAllNotesData();
      if (response) {
        dispatch(setNotes(response));
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome {user?.username}
      </Typography>
      <Grid container spacing={2}>
        {notes?.length ? (
          notes.map((note: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NotesCard
                toggleUpdate={toggleUpdate}
                note={note}
                setNoteDetails={setNoteDetails}
              />
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
      <CustomizedModel title={AddNotesConstants.TITLE} content={<AddNotes />} />
      <CustomizedModel
        title={UpdateNotesConstants.TITLE}
        content={<UpdateNotes note={noteDetails} toggleUpdate={toggleUpdate} />}
        updateOpen={updateOpen}
        setUpdateOpen={toggleUpdate}
        type="update"
      />
    </div>
  );
};

export default KeepNotesComponent;
