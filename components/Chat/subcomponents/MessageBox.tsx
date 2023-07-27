import { useState } from 'react';
import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, TextareaAutosize } from '@mui/material';
import axios from 'axios';

export default function MessageBox({ id : chatId, input, handleInputChange, handleSubmit, isLoading }: any) {
	const dispatch = useAppDispatch();
	const [message, setMessage] = useState('');

	const sendMessage = async(e:any) => {
		e.preventDefault();
		if(!input.length) return;
		dispatch(insertChat({ role: 'user', content: input }));
		handleSubmit(e);

		e.target.value = '';
		handleInputChange(e);
	};

	return <div className="absolute bottom-0 left-0 w-full">
		<div className="stretch mx-2 flex flex-row last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl relative h-full flex-1 items-stretch md:flex-col">
			<form>
				<div className={`flex flex-row w-full py-[10px] flex-grow md:py-2 md:pl-2 relative rounded-xl shadow-xs ${isLoading ? 'bg-secondary' : 'bg-primary'}`}>
					<TextareaAutosize disabled={isLoading} className="bg-transparent text-black p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder={`${isLoading ? 'Your AI is Thinking!!' : 'Type a Message!!'}`} value={input} onChange={handleInputChange} maxRows={6}/>
					<div className='transition duration-100 ease-in-out bg-black hover:text-white px-2 py-2 hover:opacity-[0.8] rounded-lg mx-2 focus:bg-slate-200'>
						{isLoading ? <CircularProgress size={'1em'}/> : <button disabled={isLoading} type='submit'><FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage}/></button>}
					</div>
				</div>
			</form>
		</div>
	</div>;
}