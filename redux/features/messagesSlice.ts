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
		},
		updateBotMessage: (state, action: PayloadAction<TMessage>) => {
			if(action.payload.role !== 'assistant') return;

			let lastMessage = state.messages[state.messages.length - 1];
			if(lastMessage.role === 'assistant') {
				lastMessage.content = action.payload.content;
				state.messages[state.messages.length - 1] = lastMessage;
			} else {
				state.messages = state.messages.concat(action.payload);
			}
		}
	}
});

export const {
	insertChat,
	reset,
	setMessages,
	updateBotMessage
} = messages.actions;
export default messages.reducer;
