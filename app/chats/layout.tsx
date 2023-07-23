'use client';
import Sidebar from '@/components/Sidebar';
import ChildLayout from '@/components/childLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { PopUpModal } from '@/components/Modals/PopUpModal';
import { InsertChatModal } from '@/components/Modals/children/InsertChatModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ChatIcon = ({ id } : any) => {
	const [open, setOpen] = useState(false);
	return <>
		<PopUpModal
			open={open}
			handleClose={()=>{
				setOpen(false);
			}}
			Child={InsertChatModal}
			childProps={{
				chatId: id
			}}
		/>
		<FontAwesomeIcon icon={faEye} onClick={() => setOpen(true)}/>
	</>;
};
export default function ChatLayout({ children }: {
	children: React.ReactNode
}) {
	const [chats, setChats] = useState([]);

	const getChats = async() => {
		const response = await axios.get('/chats/api');
		response.data.chats.map((chat: any) => {
			chat.text = chat.name;
			chat.Icon = ChatIcon;
		});
		setChats(response.data.chats);
	};
	useEffect(()=>{
		getChats();
	}, []);

	const [openCreateChat, setOpenCreateChat] = useState(false);

	const ChildActionComp = () => {
		return <center>
			<Button onClick={()=>{
				setOpenCreateChat(true);
			}} variant='outlined'>Create Chat</Button>
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
						<Sidebar elements={chats} allowClosage={true} ChildActionComp={ChildActionComp}/>
						{<div>
							{children}
						</div>}
					</div>
				</div>
			</section>
		</ChildLayout>
	);
}