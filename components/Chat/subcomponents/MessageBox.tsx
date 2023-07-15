import { useState } from 'react';
import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextareaAutosize } from '@mui/material';

export default function MessageBox() {
	const dispatch = useAppDispatch();
	const [message, setMessage] = useState('');
	const sendMessage = () => {
		dispatch(insertChat({ from: 'You', message: message }));
		setMessage('');
	};
	return <div className="absolute bottom-0 left-0 w-full pt-2">
		<div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl relative h-full flex-1 items-stretch md:flex-col">
			<div className="flex flex-row w-full py-[10px] flex-grow md:py-4 md:pl-4 relative bg-slate-800 rounded-xl shadow-xs">
				<TextareaAutosize className="bg-transparent p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Type a Message' value={message} onChange={(e)=>setMessage(e.target.value)} maxRows={6}/>
				<div className='transition duration-100 ease-in-out hover:text-slate-800 px-2 py-1 hover:bg-white rounded-lg mx-2 focus:bg-slate-200'>
					<FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage}/>
				</div>
			</div>
		</div>
	</div>;
}