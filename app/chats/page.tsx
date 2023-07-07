'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function Chats()	{

	const [chats, setChats] = useState([{ text: 'Chat 1', id: 1 }, { text: 'Chat 2', id: 2 }]);
	const [close, setClose] = useState(false);

	const toggleSidebar = () => {
		setClose(!close);
	};
	return <div className="h-screen duration-400 transition-all">
		<div className='flex flex-row'>
			<Sidebar elements={chats} closeSidebar={toggleSidebar} close={close}/>
			<div>
				Chat Componenet
			</div>
		</div>
	</div>;
}