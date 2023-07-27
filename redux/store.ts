import { configureStore } from '@reduxjs/toolkit';
import selectedChatReducer from './features/selectedChatSlice';
import messagesReducer from './features/messagesSlice';
import sessionReducer from './features/sessionSlice';
import chatsReducer from './features/chatsSlice';
export const store = configureStore({
	reducer: {
		selectedChatReducer,
		messagesReducer,
		sessionReducer,
		chatsReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;