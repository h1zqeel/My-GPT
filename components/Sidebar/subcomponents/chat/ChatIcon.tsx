import { PopUpModal } from '@/components/Modals/PopUpModal';
import { InsertChatModal } from '@/components/Modals/children/InsertChatModal';
import { errors } from '@/constants';
import { deleteChat as deleteChatFromState } from '@/redux/features/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from '@/utils/toast';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export const ChatIcon = ({ chatId } : any) => {
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();
	const selectedChatId = useAppSelector(({ selectedChatReducer }) => selectedChatReducer.chatId);

	const dispatch = useAppDispatch();
	const deleteChat = async() => {
		setDeleting(true);
		try {
			await axios.delete(`/chats/${chatId}/api`);
			dispatch(deleteChatFromState(chatId));
			setTimeout(()=>{
				toast('Your Chat was Deleted', 'success');
			}, 100);
			if(selectedChatId === chatId) {
				router.push('/chats');
			}
		} catch (error) {
			toast(errors.DEFAULT, 'error');
		}
		setDeleting(false);
	};

	return <>
		<PopUpModal
			open={open}
			handleClose={()=>{
				setOpen(false);
			}}
			Child={InsertChatModal}
			childProps={{
				chatId
			}}
		/>
		<div className='flex flex-row space-x-2'>
			<FontAwesomeIcon icon={faInfoCircle} onClick={() => setOpen(true)}/>
			{ deleting ? <CircularProgress size={15}/> : <FontAwesomeIcon icon={faTrash} onClick={deleteChat}/>}
		</div>
	</>;
};