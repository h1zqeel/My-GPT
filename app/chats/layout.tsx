'use client';
import Sidebar from '@/components/Sidebar';
import ChildLayout from '@/components/childLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function ChatLayout({ children }: {
	children: React.ReactNode
}) {
	const [chats, setChats] = useState([]);

	const getChats = async() => {
		const response = await axios.get('/chats/api');
		response.data.chats.map((chat: any) => {
			chat.text = chat.name;
		});
		setChats(response.data.chats);
	};
	useEffect(()=>{
		getChats();
	}, []);

	return (
		<ChildLayout>
			<section>
				<nav></nav>
				<div className="h-screen duration-400 transition-all">
					<div className='flex flex-row'>
						<Sidebar elements={chats} allowClosage={true}/>
						{<div>
							{children}
						</div>}
					</div>
				</div>
			</section>
		</ChildLayout>
	);
}