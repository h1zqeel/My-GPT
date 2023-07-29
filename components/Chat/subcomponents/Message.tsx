import ReactMarkdown from 'react-markdown';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { TMessage } from '@/types/Chat';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
export default function Message({ message, skeleton }: { message?: TMessage, skeleton?: boolean }) {
	const height = getRndInteger(60, 250);
	const width = getRndInteger(40, 99);

	if(skeleton) {
		return <SkeletonTheme  baseColor="#212838" highlightColor="#374151">
			<div className='mt-2'>
				<Skeleton className='rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg' height={height} width={`${width}%`} containerClassName='flex-1 mx-2'/>
			</div>
		</SkeletonTheme>
		;
	}

	return <div className='px-2 lg:px-auto'><div key='' className=' mt-2 rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg text-white bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-sky-900 px-2 lg:px-8 py-5 flex md:flex-row flex-row w-fit max-w-[100%] overflow-clip'>
		<div className='mr-4 bold'><b>{message?.role === 'user' ? <FontAwesomeIcon icon={faUser}/> : <FontAwesomeIcon icon={faRobot}/>}</b></div>
		<div className='overflow-x-scroll' style={{
			width: '20%!important'
		}}><ReactMarkdown className='max-w-[100wh]'>{message?.content ?? ''}</ReactMarkdown></div>
	</div> </div>;
}