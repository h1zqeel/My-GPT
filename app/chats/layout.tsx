'use client';
import Sidebar from '@/components/Sidebar';
import ChildLayout from '@/components/childLayout';
import { useState } from 'react';

export default function ChatLayout({ children }: {
	children: React.ReactNode
}) {
	const [chats, setChats] = useState([{ text: 'Chat 1', id: 1, page: 'chats' }, { text: 'Chat 2', id: 2, page: 'chats' }]);

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