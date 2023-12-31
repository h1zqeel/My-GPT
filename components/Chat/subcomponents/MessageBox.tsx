import { insertChat } from '@/redux/features/messagesSlice';
import { useAppDispatch } from '@/redux/hooks';
import { CircularProgress, TextareaAutosize, Tooltip } from '@mui/material';
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

	return <div className="bottom-0 left-0 w-[100%] px-4 pb-4 lg:px-24">
		<form onSubmit={sendMessage}>
			<div className={`flex flex-row w-full py-2 flex-grow relative rounded-md shadow-xs ${isLoading ? 'bg-secondary' : 'bg-primary'}`}>
				<div className='w-[94%] flex flex-col justify-center'>
					<TextareaAutosize onKeyDown={handleKeyPress} disabled={isLoading} className="bg-transparent text-black px-4 m-0 w-full resize-none focus:ring-0 focus-visible:ring-0 outline-0 focus-visible:outline-0 focus-visible:outline-none" placeholder={`${isLoading ? 'Your AI is Thinking!!' : 'Type a Message!!'}`} value={input} onChange={handleInputChange} maxRows={6}/>
				</div>
				<div className=''>
					<button disabled={isLoading} type='submit'>
						<div className='transition duration-100 ease-in-out mx-2 rounded-lg bg-black hover:text-white hover:opacity-[0.8] focus:bg-slate-200'>
							<div>
								{isLoading ?
									<ThinkingIcon />
									:
									<SendIcon />
								}
							</div>
						</div>
					</button>
				</div>
			</div>
		</form>
	</div>;
}