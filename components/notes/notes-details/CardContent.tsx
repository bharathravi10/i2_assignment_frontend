"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export interface ICardContentProps {
  note: {
    _id: string;
    note_title: string;
    note_content: string;
    user_id: string;
    last_update: Date;
  };
  toggleUpdate?: () => void;
}

const CardContent: React.FC<ICardContentProps> = ({ note }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(note.last_update));

  return (
    <Box
      sx={{
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxHeight: "180px", 
          overflowY: "auto",   
          marginBottom: "10px", 
        }}
      >
        <Typography>{note.note_content}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "auto", // This pushes the box to the bottom
        }}
      >
        <Typography>{formattedDate}</Typography>
      </Box>
    </Box>
  );
};

export default CardContent;
