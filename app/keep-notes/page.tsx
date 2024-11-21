import KeepNotesComponent from "@/components/notes";
import { getAllNotes } from "@/utils/api";
import React from "react";

const KeepNotespage = async () => {
  const notes = await getAllNotes();

  return <KeepNotesComponent notes={notes} />;
};

export default KeepNotespage;
