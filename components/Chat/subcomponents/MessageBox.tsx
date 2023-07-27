import { useState } from 'react';
import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, TextareaAutosize } from '@mui/material';
import { TChatMessageBoxProps } from '@/types/Chat';

export default function MessageBox({ input, handleInputChange, handleSubmit, isLoading }: TChatMessageBoxProps) {
	const dispatch = useAppDispatch();

	const sendMessage = async(e:any) => {
		e.preventDefault();
		if(!input.length) return;

		dispatch(insertChat({ role: 'user', content: input }));
		handleSubmit(e);

		e.target.value = '';
		handleInputChange(e);
	};

	return <div className="absolute bottom-0 left-0 w-[100%] px-4 pb-4 lg:px-24">
		<form>
			<div className={`flex flex-row w-full py-[10px] flex-grow relative rounded-xl shadow-xs ${isLoading ? 'bg-secondary' : 'bg-primary'}`}>
				<TextareaAutosize disabled={isLoading} className="bg-transparent text-black p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder={`${isLoading ? 'Your AI is Thinking!!' : 'Type a Message!!'}`} value={input} onChange={handleInputChange} maxRows={6}/>
				<div className='transition duration-100 ease-in-out mx-2 bg-black hover:text-white py-2 hover:opacity-[0.8] rounded-lg px-4 focus:bg-slate-200'>
					{isLoading ? <CircularProgress size={'1em'}/> : <button disabled={isLoading} type='submit'><FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage}/></button>}
				</div>
			</div>
		</form>
	</div>;
}