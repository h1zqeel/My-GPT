import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Box, CircularProgress, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import { TChatMessageBoxProps } from '@/types/Chat';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';
import { SendIcon, ThinkingIcon } from '@/components/CustomIcons';

export default function MessageBox({ input, handleInputChange, handleSubmit, allowSubmit, isLoading }: TChatMessageBoxProps) {
	const dispatch = useAppDispatch();

	const sendMessage = async(e:any) => {
		e.preventDefault();
		if(!input.length)  {
			toast(errors.EMPTY_MESSAGE, 'error', 300);
			return;
		};
		if(!allowSubmit) {
			toast(errors.NO_KEY, 'error');
			return;
		};
		dispatch(insertChat({ role: 'user', content: input }));
		handleSubmit(e);

		e.target.value = '';
		handleInputChange(e);
	};

	const handleKeyPress = (e:any) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage(e);
		}
	};

	return (
		<div className="bottom-0 left-0 w-[100%] px-4 pb-4 lg:px-24">
			<form onSubmit={sendMessage}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						flexGrow: 1,
						position: 'relative',
						borderRadius: '20px',
						boxShadow: 1,
						bgcolor: isLoading ? 'background.main' : 'background.paper'
					}}
				>
					<Box
						sx={{
							width: '94%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center'
						}}
					>
						<TextareaAutosize
							onKeyDown={handleKeyPress}
							disabled={isLoading}
							placeholder={
								isLoading
									? 'Your AI is Thinking!!'
									: 'Type a Message!!'
							}
							value={input}
							onChange={handleInputChange}
							maxRows={6}
							style={{
								background: 'transparent',
								color: isLoading ? 'text.secondary' : 'text.primary',
								paddingLeft: 16,
								paddingRight: 16,
								margin: 0,
								width: '100%',
								resize: 'none',
								outline: 'none',
								border: 'none'
							}}
						/>
					</Box>
					<IconButton
						disabled={isLoading}
						type="submit"
						sx={{
							mx: 0,
							borderRadius: 2,
							bgcolor: 'transparent',
							'&:hover': {
								opacity: 0.8,
								color: '#fff'
							}
						}}
					>
						{isLoading ? <ThinkingIcon /> : <SendIcon />}
					</IconButton>
				</Box>
			</form>
		</div>
	);
}