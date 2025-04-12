import ReactMarkdown from 'react-markdown';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { TMessage } from '@/types/Chat';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
export default function Message({ message, skeleton }: { message?: TMessage, skeleton?: boolean }) {
	const [height] = useState(getRndInteger(60, 150));
	const [width] = useState(getRndInteger(40, 99));
	if(skeleton) {
		return <SkeletonTheme  baseColor="#212838" highlightColor="#374151">
			<div className='mt-2'>
				<Skeleton className='rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg' height={height} width={`${width}%`} containerClassName='flex-1 mx-2'/>
			</div>
		</SkeletonTheme>;
	}

	return <div className='px-2 lg:px-auto'><div key='' className='mt-2 flex md:flex-row w-fit max-w-full overflow-clip rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg text-white px-2 lg:px-8 py-5 bg-linear-to-br from-gray-700 via-gray-900 to-sky-900 bg-[length:200%_200%] motion-safe:animate-[gradient-x_12s_ease_infinite]'>
		<div className='mr-4 bold'><b>{message?.role === 'user' ? <FontAwesomeIcon icon={faUser}/> : <FontAwesomeIcon icon={faRobot}/>}</b></div>
		<div className='overflow-x-scroll max-w-[100wh]' style={{
			width: '20%!important'
		}}><ReactMarkdown>{message?.content ?? ''}</ReactMarkdown></div>
	</div> </div>;
}