import { Tooltip, CircularProgress } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export const ThinkingIcon = () => (
	<Tooltip title="Thinking...">
		<CircularProgress size={40} thickness={4} />
	</Tooltip>
);

export const SendIcon = () => (
	<Tooltip title="Send a Message">
		<SendRoundedIcon fontSize="large" />
	</Tooltip>
);
