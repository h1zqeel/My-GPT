import { TMessage } from '@/types/Chat';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Message({ message, skeleton }: { message?: TMessage, skeleton?: boolean }) {
	if(skeleton) {
		return <SkeletonTheme baseColor="#202020" highlightColor="#444">
			<div className='flex mb-8'>
				<Skeleton height={50} width={'100%'} containerClassName='flex-1 mx-2'/>
			</div>
		</SkeletonTheme>
		;
	}

	return <div className='px-2 lg:px-auto'><div key='' className=' mt-2 rounded-md shadow-lg text-white bg-secondBackground px-2 lg:px-8 py-5 flex md:flex-row flex-row w-[100%] overflow-clip'>
		<div className='mr-4 bold'><b>{message?.role === 'user' ? <FontAwesomeIcon icon={faUser}/> : <FontAwesomeIcon icon={faRobot}/>}</b></div>
		<div className='overflow-x-scroll' style={{
			width: '20%!important'
		}}><ReactMarkdown className='max-w-[100wh]'>{message?.content ?? ''}</ReactMarkdown></div>
	</div> </div>;
}