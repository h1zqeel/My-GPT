import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type selectedChatState = {
	chatId: number | null;
};

const initialState = {
	chatId: null
} as selectedChatState;

export const selectedChat = createSlice({
	name: 'selectChat',
	initialState,
	reducers: {
		reset: () => initialState,
		setSelectedChat: (state, action: PayloadAction<number>) => {
			state.chatId = action.payload;
		}
	}
});

export const {
	setSelectedChat,
	reset
} = selectedChat.actions;
export default selectedChat.reducer;
