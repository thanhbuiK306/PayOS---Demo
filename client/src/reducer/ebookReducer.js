import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {getEbookList} from '../services/ebookService'

export const getEbooks = createAsyncThunk(
  "ebooks",
  async (thunkAPI) => {
    try {
        const data = await getEbookList()
        return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const resetState = createAction("Reset_all");
export const resetEbookState = createAction("ebook/resetState");

export const ebookSlice = createSlice({
  name: "ebooks",
  initialState: {
    ebook: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getEbooks.pending]: (state, action) => {
        state.loading = true;
      },
      [getEbooks.fulfilled]: (state, action) => {
        state.loading = false;
        state.ebook = action.payload;
      },
      [getEbooks.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});
export default ebookSlice.reducer;