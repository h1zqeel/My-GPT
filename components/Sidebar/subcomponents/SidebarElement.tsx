'use client';

import { TSidebarElement } from '@/types/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedChat } from '@/redux/features/selectedChatSlice';

const SidebarElement = ({ icon = '', text = '', page = 'chats', id }: TSidebarElement) => {
	const selectedChatId = useAppSelector(({ selectedChatReducer }) => selectedChatReducer.chatId);
	const router = useRouter();
	const redirect = () => {
		router.push(`/${page}/${id}`);
	};
	return (
		<div className={`transition-colors duration-150 flex items-center m-2 rounded-md p-2 cursor-pointer hover:bg-sky-700 w-64 overflow-hidden ${id === selectedChatId ? 'bg-sky-800': ''}`} onClick={redirect}>
			{icon}
			<p>{text}</p>
		</div>
	);
};

export default SidebarElement;