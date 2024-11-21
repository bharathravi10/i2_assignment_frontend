"use client";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomizedModel from "../common/model";
import AddNotes from "./add-notes";
import UpdateNotes from "./update-notes";
import NotesCard from "./notes-details";
import { AddNotesConstants, UpdateNotesConstants } from "./notes-constants";

interface INotesCardProps {
  notes: {
    _id: string;
    note_title: string;
    note_content: string;
    user_id: string;
    last_update: Date;
  }[];
}
export interface INotes {
  _id: string;
  note_title: string;
  note_content: string;
  user_id: string;
  last_update: Date;
}
const KeepNotesComponent: React.FC<INotesCardProps> = ({ notes }) => {
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
  return (
    <div>
      <Typography>Welcome Deva</Typography>
      <Grid container spacing={2}>
        {notes &&
          notes.length &&
          notes.map((note, index) => (
            <Grid item xs={4} key={index}>
              <NotesCard
                toggleUpdate={toggleUpdate}
                note={note}
                setNoteDetails={setNoteDetails}
              />
            </Grid>
          ))}
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
