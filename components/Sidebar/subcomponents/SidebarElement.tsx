'use client';

import { TSidebarElement } from '@/types/Sidebar';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

const SidebarElement = ({ Icon = '', text = '', page = 'chats', id }: TSidebarElement) => {
	const selectedChatId = useAppSelector(({ selectedChatReducer }) => selectedChatReducer.chatId);
	const router = useRouter();
	const redirect = () => {
		return router.push(`/${page}/${id}`);
	};
	return (
		<div className={`transition-colors duration-150 flex items-center justify-between m-2 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black w-64 overflow-hidden ${id === selectedChatId ? 'bg-primary text-black': ''}`} onClick={redirect}>
			<p>{text}</p>
			{Icon && <div className='float-right'><Icon id={id}/></div>}
		</div>
	);
};

export default SidebarElement;