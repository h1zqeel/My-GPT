import { TMessage } from '@/types/Chat';
import ReactMarkdown from 'react-markdown';

export default function Message({ message }: { message: TMessage }) {
	return <div key='' className='mt-5 px-8 md:px-8 lg:px-8 py-5 flex flex-col md:flex-row lg:flex-row w-[100%] overflow-clip'>
		<div className='mr-8 bold'><b>{message.role}</b></div>
		<div className='overflow-x-scroll' style={{
			width: '20%!important'
		}}><ReactMarkdown className='max-w-[100wh]'>{message.content}</ReactMarkdown></div>
	</div>;
}