import { TMessage } from '@/types/Chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type messagesState = {
	messages: TMessage[];
};

const initialState = {
	messages: []
} as messagesState;

export const messages = createSlice({
	name: 'selectChat',
	initialState,
	reducers: {
		reset: () => initialState,
		insertChat: (state, action: PayloadAction<TMessage>) => {
			state.messages = state.messages.concat(action.payload);
		},
		setMessages: (state, action: PayloadAction<TMessage[]>) => {
			state.messages = action.payload;
		}
	}
});

export const {
	insertChat,
	reset,
	setMessages
} = messages.actions;
export default messages.reducer;
