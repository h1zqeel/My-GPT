import { TInsertChatModal } from '@/types/Modals';
import { Button, CircularProgress } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
export const InsertChatModal = ({ props } : TInsertChatModal) => {
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChatCreation = async() => {
		setError('');
		if(message.length < 10) {
			setError('Message must be at least 5 character long');
			return;
		}
		if(name.length < 1) {
			setError('Name can\'t be Empty');
			return;
		}
		setLoading(true);
		const response = await axios.post('/chats/api', {
			name,
			systemMessage: message
		});

		if(response.data && response.data.ok) {
			window.location.reload();
		}
	};
	const fetchChat = async() => {
		setLoading(true);
		const response = await axios.get(`/chats/api?id=${props?.chatId}`);
		setName(response.data.chat.name);
		setMessage(response.data.chat.systemMessage);
		setLoading(false);
	};
	useEffect(()=>{
		if(props?.chatId) {
			fetchChat();
		}
	}, []);
	return <>
		<p className='text-2xl p-1 mb-2'>{props?.chatId ? 'System Message' : 'New Chat'}</p>
		{props?.chatId && loading ? <> <center><CircularProgress size={25}/> </center></> : <>
			<TextareaAutosize disabled={!!props?.chatId} className="bg-transparent p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Enter a Name' value={name} onChange={(e)=>setName(e.target.value)} maxRows={1}/>
			<TextareaAutosize disabled={!!props?.chatId} className="bg-transparent p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Type a System Message' value={message} onChange={(e)=>setMessage(e.target.value)} maxRows={6}/>
		</>}
		{!props?.chatId && <>
			{loading ? <div className='float-right'><CircularProgress size={25} /> </div>: <Button className='float-right' onClick={handleChatCreation}>Create</Button>}
			<div className='text-xs mt-5 text-red-500'>{ error }</div>
		</>}
	</>;
};