'use client';

import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { TChat } from '@/types/Chat';
import { ChatIcon } from './chat/ChatIcon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button, useTheme } from '@mui/material';

const SidebarElement = ({
	element,
	page,
	skeleton = false,
	subpage = 'messages'
}: {
	element?: TChat;
	page?: string;
	skeleton?: Boolean;
	subpage?: string;
}) => {
	const theme = useTheme();
	const selectedChatId = useAppSelector(
		({ selectedChatReducer }) => selectedChatReducer.chatId
	);
	if (skeleton) {
		return (
			<SkeletonTheme baseColor={theme.palette.surfaceB.main} highlightColor={theme.palette.surfaceB.main}>
				<div className="flex m-2 mb-4 mx-4">
					<Skeleton
						height={40}
						width={'100%'}
						containerClassName="flex-1"
					/>
				</div>
			</SkeletonTheme>
		);
	}
	return (
		<Button
			component={Link}
			href={`/${page}/${element?.id}/${subpage}`}
			fullWidth
			disableRipple
			sx={{
				justifyContent: 'space-between',
				m: 1,
				p: 1,
				width: '94%',
				borderRadius: 2,
				textTransform: 'none',
				backgroundColor:
					element?.id === selectedChatId
						? 'primary.main'
						: 'transparent',
				color: 'text.primary',
				'&:hover': {
					backgroundColor:
						element?.id === selectedChatId
							? 'primary.main'
							: 'secondary.main',
					color: element?.id === selectedChatId ? 'text.primary' : 'text.secondary'
				}
			}}
		>
			<span
				style={{
					flexGrow: 1,
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis'
				}}
			>
				{element?.name}
			</span>
			{page === 'chats' && <ChatIcon chatId={element?.id} />}
		</Button>
	);
};

export default SidebarElement;
