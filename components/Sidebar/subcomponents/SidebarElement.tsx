'use client';

import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { TChat } from '@/types/Chat';
import { ChatIcon } from './chat/ChatIcon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SidebarElement = ({ element, page, skeleton = false, subpage = 'messages' }:  {element?: TChat, page?: string, skeleton?: Boolean, subpage?: string}) => {
	const selectedChatId = useAppSelector(({ selectedChatReducer }) => selectedChatReducer.chatId);
	if(skeleton) {
		return (
			<SkeletonTheme baseColor="#202020" highlightColor="#444">
				<div className='flex m-2 mb-4 mx-4'>
					<Skeleton height={40} width={'100%'} containerClassName='flex-1'/>
				</div>
			</SkeletonTheme>
		);
	}
	return (
		<div className={`transition-colors duration-150 flex items-center justify-between m-2 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black w-64 overflow-hidden ${element?.id === selectedChatId ? 'bg-primary text-black': ''}`}>
			<div className='flex-grow'>
				<Link href={`/${page}/${element?.id}/${subpage}`}>
					<p>{element?.name}</p>
				</Link>
			</div>
			{page === 'chats' && <ChatIcon chatId={element?.id}/>}
		</div>
	);
};

export default SidebarElement;