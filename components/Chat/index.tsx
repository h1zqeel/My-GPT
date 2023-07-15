import { setSelectedChat } from '@/redux/features/selectedChatSlice';
import { useAppDispatch } from '@/redux/hooks';
import { TChatProps } from '@/types/components/Chat';

export default function Chat({ id }: TChatProps) {
	const dispatch = useAppDispatch();

	dispatch(setSelectedChat(parseInt(id, 10)));

	return <p>
		Chat {id}
	</p>;
}