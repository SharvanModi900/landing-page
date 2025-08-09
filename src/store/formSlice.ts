import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  address: string;
  title: string;
  description: string;
  loading: boolean;
  message: string;
}

const initialState: FormState = {
  address: '',
  title: '',
  description: '',
  loading: false,
  message: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    resetForm(state) {
      state.address = '';
      state.title = '';
      state.description = '';
      state.loading = false;
      state.message = '';
    },
  },
});

export const { setAddress, setTitle, setDescription, setLoading, setMessage, resetForm } = formSlice.actions;
export default formSlice.reducer;
