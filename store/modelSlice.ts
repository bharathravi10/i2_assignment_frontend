import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false, 
};

// Create the modal slice
const modalSlice = createSlice({
  name: 'addnotes-modal',
  initialState,
  reducers: {
    toggleModal(state) {
        state.isOpen = !state.isOpen;
      },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
