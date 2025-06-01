import { TUser } from '@/types/User';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type sessionState = {
	user: TUser | null;
	loading: boolean;
};

const initialState = {
	loading: true,
	user: null
} as sessionState;

export const getSession = createAsyncThunk(
	'session/getSession',
	async(refresh : Boolean, { getState }) => {
		const state = getState() as { sessionReducer: sessionState};
		if(state.sessionReducer.user && !refresh) {
			return { user: state.sessionReducer.user };
		}
		// const response = await axios.get('/api/auth');
		return null;
	});
export const session = createSlice({
	name: 'session',
	initialState,
	reducers: {
		reset: () => initialState,
		setSession: (state, action: PayloadAction<TUser>) => {
			state.user = action.payload;
			state.loading = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getSession.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.loading = false;
		});
		builder.addCase(getSession.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getSession.rejected, (state, action) => {
			state.loading = false;
		});
	}
});

export const {
	setSession,
	reset
} = session.actions;

export default session.reducer;
