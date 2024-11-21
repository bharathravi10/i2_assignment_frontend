import { createSlice } from '@reduxjs/toolkit';

interface INotesCardProps {
  notes: {
    _id: string;
    note_title: string;
    note_content: string;
    user_id: string;
    last_update: Date;
  }[];
}

const initialState: INotesCardProps = {
  notes: [],
};

// Create the modal slice
const cardSlice = createSlice({
  name: 'notesCard',
  initialState,
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = cardSlice.actions;

export default cardSlice.reducer;

