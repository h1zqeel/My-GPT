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
				<Skeleton height={50} width={'90%'} containerClassName='flex-1'/>
			</div>
		</SkeletonTheme>
		;
	}

	return <div key='' className='mt-5 px-8 md:px-8 lg:px-8 py-5 flex flex-col md:flex-row lg:flex-row w-[100%] overflow-clip'>
		<div className='mr-8 bold'><b>{message?.role === 'user' ? <FontAwesomeIcon icon={faUser}/> : <FontAwesomeIcon icon={faRobot}/>}</b></div>
		<div className='overflow-x-scroll' style={{
			width: '20%!important'
		}}><ReactMarkdown className='max-w-[100wh]'>{message?.content ?? ''}</ReactMarkdown></div>
	</div>;
}