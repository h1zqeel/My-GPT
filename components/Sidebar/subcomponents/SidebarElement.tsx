'use client';

import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { TChat } from '@/types/Chat';
import { ChatIcon } from './chat/ChatIcon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SidebarElement = ({ element, page, skeleton = false }:  {element?: TChat, page?: string, skeleton?: Boolean}) => {
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
		<Link href={`/${page}/${element?.id}`}>
			<div className={`transition-colors duration-150 flex items-center justify-between m-2 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-black w-64 overflow-hidden ${element?.id === selectedChatId ? 'bg-primary text-black': ''}`}>
				<p>{element?.name}</p>
				{page === 'chats' && <ChatIcon chatId={element?.id}/>}
			</div>
		</Link>
	);
};

export default SidebarElement;