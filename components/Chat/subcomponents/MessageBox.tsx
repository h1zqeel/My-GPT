import { useState } from 'react';
import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { TChatProps } from '@/types/Chat';

export default function MessageBox({ id : chatId }: TChatProps) {
	const dispatch = useAppDispatch();
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const sendMessage = async() => {
		dispatch(insertChat({ role: 'user', content: message }));
		setLoading(true);
		const response = await axios.post(`/chats/${chatId}/api`, {
			text: message
		});
		if(response.data && response.data.ok) {
			dispatch(insertChat(response.data.gptResponse));
		}
		setMessage('');
		setLoading(false);
	};
	return <div className="absolute bottom-0 left-0 w-full">
		<div className="stretch mx-2 flex flex-row last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl relative h-full flex-1 items-stretch md:flex-col">
			<div className="flex flex-row w-full py-[10px] flex-grow md:py-2 md:pl-2 relative bg-primary rounded-xl shadow-xs">
				<TextareaAutosize className="bg-transparent text-black p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Type a Message' value={message} onChange={(e)=>setMessage(e.target.value)} maxRows={6}/>
				<div className='transition duration-100 ease-in-out bg-black hover:text-white px-2 py-2 hover:opacity-[0.8] rounded-lg mx-2 focus:bg-slate-200'>
					{loading ? <CircularProgress size={'1em'}/> : <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage}/>}
				</div>
			</div>
		</div>
	</div>;
}