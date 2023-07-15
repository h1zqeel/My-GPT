import { configureStore } from '@reduxjs/toolkit';
import selectedChatReducer from './features/selectedChatSlice';
export const store = configureStore({
	reducer: {
		selectedChatReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;