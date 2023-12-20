import _ from 'lodash';
import axios from 'axios';
import { gptModels } from '@/constants';
import { TInsertChatModal } from '@/types/Modals';
import { Button, CircularProgress, InputLabel, MenuItem, Select } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getChats } from '@/redux/features/chatsSlice';
import { parseOpenAIError } from '@/utils/helpers';
import { toast } from '@/utils/toast';

export const InsertChatModal = ({ props, handleClose } : TInsertChatModal) => {
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [model, setModel] = useState(gptModels[0].value);
	const [loading, setLoading] = useState(!!props?.chatId);
	const [allowedEngines, setAllowedEngines] = useState(_.map(gptModels, 'value'));
	const [fetchingEngines, setFetchingEngines] = useState(!props?.chatId);
	const [preventChatCreation, setPreventChatCreation] = useState(false);
	const dispatch = useAppDispatch();

	const handleChatCreation = async() => {
		if(preventChatCreation) return;
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
			systemMessage: message,
			model
		});

		if(response.data && response.data.ok) {
			dispatch(getChats());
			handleClose();
		}
	};

	const handleKeyPress = (e:any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleChatCreation();
		}
	};

	const fetchChat = async() => {
		setLoading(true);
		const response = await axios.get(`/chats/api?id=${props?.chatId}`);
		setName(response.data.chat.name);
		setMessage(response.data.chat.systemMessage);
		setModel(response.data.chat.model);
		setLoading(false);
	};

	const fetchAllowedEngines = async() => {
		setFetchingEngines(true);
		try{
			const { data: { models } } : any = await axios.get('/api/user/models');
			setAllowedEngines(models);
			setFetchingEngines(false);
		} catch(e : any) {
			setAllowedEngines([]);
			setPreventChatCreation(true);
			setError(parseOpenAIError(e.response!.status));
			setFetchingEngines(false);
		}
	};
	useEffect(()=>{
		if(props?.chatId) {
			fetchChat();
		} else {
			fetchAllowedEngines();
		}
	}, []);

	useEffect(()=>{
		if(error.length) {
			toast(error, 'error');
		}
	}, [error]);

	return <>
		<p className='text-2xl p-1 mb-2'>{props?.chatId ? 'System Message' : 'New Chat'}</p>
		{props?.chatId && loading ? <> <center><CircularProgress size={25}/> </center></> : <>
			<TextareaAutosize onKeyDown={handleKeyPress} disabled={!!props?.chatId} className="bg-transparent p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Enter a Name' value={name} onChange={(e)=>setName(e.target.value)} maxRows={1}/>
			<TextareaAutosize onKeyDown={handleKeyPress} disabled={!!props?.chatId} className="bg-transparent p-1 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder='Type a System Message' value={message} onChange={(e)=>setMessage(e.target.value)} maxRows={6}/>
			{!!allowedEngines.length && <div className='mt-2'>
				<InputLabel id="demo-simple-select-label">Model</InputLabel>
				{fetchingEngines ? <CircularProgress  size={25}/> : <Select
					value={model}
					disabled={!!props?.chatId || allowedEngines.length === 0}
					variant='standard'
					onChange={(e)=>setModel(e.target.value)}
				>
					{gptModels.filter(e=>allowedEngines.includes(e.value)).map(({ value, name }, i) => <MenuItem key={i} value={value}>{name}</MenuItem>)}
				</Select>}
			</div>}
		</>}

		{!props?.chatId && <>
			{loading ? <div className='float-right'><CircularProgress size={25} /> </div>: <Button sx={{
				':disabled':{
					backgroundColor: 'gray !important',
					color: '#000 !important'
				}
			}} variant='outlined' disabled={(fetchingEngines || preventChatCreation || loading)} className='float-right' onClick={handleChatCreation}>Create</Button>}
			<div className='text-xs mt-5 text-red-500'>{ error }</div>
		</>}
	</>;
};