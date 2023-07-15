import { createRef, useEffect } from 'react';
import { setSelectedChat } from '@/redux/features/selectedChatSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TChatProps, TMessage } from '@/types/Chat';
import Message from './subcomponents/Message';
import MessageBox from './subcomponents/MessageBox';

export default function Chat({ id }: TChatProps) {
	const dispatch = useAppDispatch();
	const messagesEndRef : React.RefObject<HTMLDivElement> = createRef();

	dispatch(setSelectedChat(parseInt(id, 10)));

	const messages = useAppSelector(({ messagesReducer }) => messagesReducer.messages);
	useEffect(()=>{
		messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return <div className='lg:relative'>
		<div className='flex flex-col max-h-[100vh] pb-28'>
			<div className='overflow-scroll'>
				{messages.map((message : TMessage) => {
					return <div key={message.id} className=' w-[100%]'> <Message key={message.id} message={message} /> </div>;
				})}
				<div ref={messagesEndRef as React.RefObject<HTMLDivElement>} />
			</div>

			<div>
				<MessageBox />
			</div>
		</div>
	</div>;
}