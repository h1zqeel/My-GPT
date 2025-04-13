import ReactMarkdown from 'react-markdown';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { TMessage } from '@/types/Chat';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTheme } from '@mui/system';

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}
export default function Message({
	message,
	skeleton,
}: {
	message?: TMessage;
	skeleton?: boolean;
}) {
	const [height] = useState(getRndInteger(60, 150));
	const [width] = useState(getRndInteger(40, 99));
	const theme = useTheme()
	if (skeleton) {
		return (
			<SkeletonTheme
				baseColor={theme.palette.surfaceB.main}
				highlightColor={theme.palette.surfaceA.main}
			>
				<div className="mt-2">
					<Skeleton
						className="rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg"
						height={height}
						width={`${width}%`}
						containerClassName="flex-1 mx-2"
					/>
				</div>
			</SkeletonTheme>
		);
	}

	return (
		<div className="px-2 lg:px-auto">
			<div
				className={`
					mt-2 flex md:flex-row w-fit max-w-full overflow-clip
					rounded-e-2xl rounded-bl-lg rounded-tl-md shadow-lg
					text-text-primary px-2 lg:px-8 py-5 bg-gradient-to-br
					${
						message?.role === 'user'
							? 'from-surface-a-start to-surface-a-end'
							: 'from-surface-b-start to-surface-b-end'
					}
				`}
			>
				<div className="mr-4 font-bold">
					{message?.role === 'user' ? (
						<FontAwesomeIcon icon={faUser} />
					) : (
						<FontAwesomeIcon icon={faRobot} />
					)}
				</div>

				<div className="overflow-x-scroll max-w-[100vw]">
					<ReactMarkdown>{message?.content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
