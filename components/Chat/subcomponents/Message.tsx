import { TMessage } from '@/types/Chat';

export default function Message({ message }: { message: TMessage }) {
	return <div key='' className='mt-5 px-8 py-5 flex flex-row w-[90%]'>
		<div className='mr-8'>{message.from}</div>
		<div>{message.message}</div>
	</div>;
}