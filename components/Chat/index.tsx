import { createRef, useEffect } from 'react';
import { setSelectedChat } from '@/redux/features/selectedChatSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMessages, insertChat, updateBotMessage } from '@/redux/features/messagesSlice';
import { TChatProps, TMessage } from '@/types/Chat';
import Message from './subcomponents/Message';
import MessageBox from './subcomponents/MessageBox';
import axios from 'axios';
import { useCompletion } from 'ai/react';

export default function Chat({ id }: TChatProps) {
	const dispatch = useAppDispatch();

	const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
		api: `/chats/${id}/completion/api`,
		onFinish: async function(prompt, completion) {
			await axios.post(`/chats/${id}/api`, { content: prompt, role: 'user' });
			return axios.post(`/chats/${id}/api`, { content: completion, role: 'assistant' });
		}
	});
	const messagesEndRef : React.RefObject<HTMLDivElement> = createRef();

	dispatch(setSelectedChat(parseInt(id, 10)));

	const messages = useAppSelector(({ messagesReducer }) => messagesReducer.messages);

	const getMesssages = async() => {
		const response = await axios.get(`/chats/${id}/api`);
		dispatch(setMessages(response.data.messages));
	};
	useEffect(()=>{
		getMesssages();
		messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(()=>{
		if(completion.length > 1) {
			dispatch(updateBotMessage({ role: 'assistant', content: completion }));
			messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
		}
	}, [completion]);

	return <div className='lg:relative'>
		<div className='flex flex-col max-h-[100vh] pb-28'>
			<div className='overflow-scroll grow min-w-[70vw] max-w-[70vw] h-[100vh]'>
				{messages.map((message : TMessage) => {
					return <div key={message.id} className=' max-w-[70vw]'> <Message key={message.id} message={message} /> </div>;
				})}
				<div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
			</div>

			<div>
				<MessageBox input={input} handleInputChange={handleInputChange} handleSubmit ={handleSubmit} isLoading={isLoading}/>
			</div>
		</div>
	</div>;
}