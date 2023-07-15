import { TMessage } from '@/types/Chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type messagesState = {
	messages: TMessage[];
};

const initialState = { 
	messages: [
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolore voluptas ipsam rem error temporibus vel, maiores repellat ad at totam sit unde culpa in similique deserunt, delectus eius nisi tempora ipsa saepe tenetur harum! Aperiam labore maxime modi nam corrupti nobis aspernatur, ex illum! Dolorum beatae similique a nisi.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolore voluptas ipsam rem error temporibus vel, maiores repellat ad at totam sit unde culpa in similique deserunt, delectus eius nisi tempora ipsa saepe tenetur harum! Aperiam labore maxime modi nam corrupti nobis aspernatur, ex illum! Dolorum beatae similique a nisi.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolore voluptas ipsam rem error temporibus vel, maiores repellat ad at totam sit unde culpa in similique deserunt, delectus eius nisi tempora ipsa saepe tenetur harum! Aperiam labore maxime modi nam corrupti nobis aspernatur, ex illum! Dolorum beatae similique a nisi.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' },
		{ from:'AI', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex.' }
	]
} as messagesState;

export const messages = createSlice({
	name: 'selectChat',
	initialState,
	reducers: {
		reset: () => initialState,
		insertChat: (state, action: PayloadAction<TMessage>) => {
			state.messages = state.messages.concat(action.payload);
		}
	}
});

export const {
	insertChat,
	reset
} = messages.actions;
export default messages.reducer;
