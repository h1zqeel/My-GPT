'use client';
import Sidebar from '@/components/Sidebar';
import ChildLayout from '@/components/childLayout';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { PopUpModal } from '@/components/Modals/PopUpModal';
import { InsertChatModal } from '@/components/Modals/children/InsertChatModal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getChats } from '@/redux/features/chatsSlice';

export default function ChatLayout({ children }: {
	children: React.ReactNode
}) {
	const chats = useAppSelector(({ chatsReducer }) => chatsReducer.chats);
	const dispatch = useAppDispatch();

	useEffect(()=>{
		dispatch(getChats());
	}, []);

	const [openCreateChat, setOpenCreateChat] = useState(false);

	const ChildActionComp = () => {
		return <center>
			<div className='flex grow justify-center w-48 overflow-hidden'>
				<Button onClick={()=>{
					setOpenCreateChat(true);
				}} variant='outlined'>Create Chat</Button>
			</div>
			<PopUpModal open={openCreateChat} handleClose={()=>{
				setOpenCreateChat(false);
			}} Child={InsertChatModal}/>
		</center>;
	};

	return (
		<ChildLayout>
			<section>
				<nav></nav>
				<div className="h-screen duration-400 transition-all">
					<div className='flex flex-row'>
						<div className='lg:w-[20%]'>
							<Sidebar elements={chats} allowClosage={true} ChildActionComp={ChildActionComp}/>
						</div>
						{<div className='lg:w-[80%]'>
							{children}
						</div>}
					</div>
				</div>
			</section>
		</ChildLayout>
	);
}