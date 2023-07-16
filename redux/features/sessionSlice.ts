import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type sessionState = {
	user: any;
	loading: boolean;
};

const initialState = {
	loading: true,
	user: null
} as sessionState;

export const getSession = createAsyncThunk(
	'session/getSession',
	async(thunkAPI) => {
		const response = await axios.get('auth/api');
		return response.data;
	});
export const session = createSlice({
	name: 'session',
	initialState,
	reducers: {
		reset: () => initialState,
		setSession: (state, action: PayloadAction<any>) => {
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
