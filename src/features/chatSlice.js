import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import chatServices from "./chatService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  chats: "",
  message: "",
  messages: "",
};

export const loadChats = createAsyncThunk(
  "/api/chats",
  async (chatId, thunkAPI) => {
    try {
      return await chatServices.chatsService(chatId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loadMessages = createAsyncThunk(
  "api/messages",
  async (chatId, thunkAPI) => {
    try {
      return await chatServices.chatMessagesService(chatId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadChats.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(loadChats.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(loadChats.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
    builder
      .addCase(loadMessages.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default chatSlice.reducer;
