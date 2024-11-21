import React from "react";
import CustomizedCard from "../../common/card";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CardContent from "./CardContent";
import { Box, IconButton } from "@mui/material";
import { INotes } from "..";

interface INotesCardProps {
  toggleUpdate: () => void;
  note: {
    _id: string;
    note_title: string;
    note_content: string;
    user_id: string;
    last_update: Date;
  };
  setNoteDetails: React.Dispatch<React.SetStateAction<INotes>>;
}

const NotesCard: React.FC<INotesCardProps> = ({
  toggleUpdate,
  note,
  setNoteDetails,
}) => {
  const handleUpdateClick = () => {
    toggleUpdate();
    setNoteDetails({ ...note });
  };
  return (
    <Box onClick={handleUpdateClick} sx={{ cursor: "pointer" }}>
      <CustomizedCard
        heading={note.note_title}
        cardContent={<CardContent note={note} />}
        rightIcon={
          <IconButton>
            <AdsClickIcon
              fontSize="small"
              sx={{
                margin: "0px !important",
                padding: "0px !important",
                color: "red",
              }}
            />
          </IconButton>
        }
        minWidth="100%"
      />
    </Box>
  );
};

export default NotesCard;
