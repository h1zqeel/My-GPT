import { createRef, useEffect } from 'react';
import { setSelectedChat } from '@/redux/features/selectedChatSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMessages } from '@/redux/features/messagesSlice';

import { TChatProps, TMessage } from '@/types/Chat';
import Message from './subcomponents/Message';
import MessageBox from './subcomponents/MessageBox';
import axios from 'axios';

export default function Chat({ id }: TChatProps) {
	const dispatch = useAppDispatch();
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

	return <div className='lg:relative'>
		<div className='flex flex-col max-h-[100vh] pb-28'>
			<div className='overflow-scroll grow min-w-[70vw] max-w-[70vw] h-[100vh]'>
				{messages.map((message : TMessage) => {
					return <div key={message.id} className=' max-w-[70vw]'> <Message key={message.id} message={message} /> </div>;
				})}
				<div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
			</div>

			<div>
				<MessageBox id= {id}/>
			</div>
		</div>
	</div>;
}