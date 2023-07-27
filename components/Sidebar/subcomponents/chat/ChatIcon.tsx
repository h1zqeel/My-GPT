import { PopUpModal } from '@/components/Modals/PopUpModal';
import { InsertChatModal } from '@/components/Modals/children/InsertChatModal';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';


export const ChatIcon = ({ chatId } : any) => {
	const [open, setOpen] = useState(false);
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
		<FontAwesomeIcon icon={faInfoCircle} onClick={() => setOpen(true)}/>
	</>;
};