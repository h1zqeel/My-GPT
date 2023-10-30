import { TMessage } from '@/types/Chat';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type messagesState = {
	messages: TMessage[];
	loading: boolean;
	error: boolean;
};

const initialState = {
	messages: [],
	loading: false,
	error: false
} as messagesState;


export const getMessagesForChat = createAsyncThunk(
	'message/getMessagesForChat',
	async({ chatId }: {chatId: number}) => {
		const response = await axios.get(`/chats/${chatId}/messages/api`);
		return response.data;
	});

export const messages = createSlice({
	name: 'messages',
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
	},
	extraReducers: (builder) => {
		builder.addCase(getMessagesForChat.fulfilled, (state, action) => {
			state.messages = action.payload.messages;
			state.loading = false;
			state.error = false;
		});
		builder.addCase(getMessagesForChat.pending, (state, action) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(getMessagesForChat.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
		});
	}
});

export const {
	insertChat,
	reset,
	setMessages,
	updateBotMessage
} = messages.actions;
export default messages.reducer;
