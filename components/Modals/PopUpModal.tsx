import { TPopUpModal } from '@/types/Modals';
import { Box, Modal } from '@mui/material';

export const PopUpModal = ({ open, handleClose, Child, childProps } : TPopUpModal) => {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		borderRadius: '20px',
		p: 4
	};
	return <Modal
		open={open}
		onClose={handleClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<Box sx={style}>
			<Child props={childProps} handleClose={handleClose}/>
		</Box>
	</Modal>;
};