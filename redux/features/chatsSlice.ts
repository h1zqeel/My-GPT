import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type chatsState = {
	chats: any[];
	loading: boolean;
};

const initialState = {
	chats: [],
	loading: false
} as chatsState;


export const getChats = createAsyncThunk(
	'chats/getChats',
	async() => {
		const response = await axios.get('/chats/api');

		return response.data;
	});

export const chats = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		reset: () => initialState,
		setChats: (state, action: PayloadAction<any[]>) => {
			state.chats = action.payload;
		},
		deleteChat: (state, action: PayloadAction<string>) => {
			console.log('hello hello');
			state.chats = state.chats.filter((chat) => chat.id !== action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getChats.fulfilled, (state, action) => {
			state.chats = action.payload.chats;
			state.loading = false;
		});
		builder.addCase(getChats.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getChats.rejected, (state, action) => {
			state.loading = false;
		});
	}
});

export const {
	reset,
	setChats,
	deleteChat
} = chats.actions;
export default chats.reducer;
