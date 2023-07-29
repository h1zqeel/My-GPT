'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SidebarElement from './subcomponents/SidebarElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
import { TSidebarProps } from '@/types/Sidebar';
import { TChat } from '@/types/Chat';
import { useAppSelector } from '@/redux/hooks';
import { LogoutIcon } from '../buttons';

export default function Sidebar({ elements, allowClosage = true, ChildActionComp }: TSidebarProps)	{
	const [close, setClose] = useState(false);

	const closeSidebar = () => {
		setClose(!close);
	};

	const chatsLoading = useAppSelector(({ chatsReducer }) => chatsReducer.loading);
	const messagesLoading = useAppSelector(({ messagesReducer }) => messagesReducer.loading);
	useEffect(()=>{
		if (messagesLoading === true) {
			setClose(true);
		}
	}, [messagesLoading]);
	return <>
		{<div className='lg:hidden' style={{
			opacity: !close ? '0' : '1',
			transitionProperty: 'opacity',
			transitionDuration: '150ms'
		}}>
			<div className='p-5 m-2 text-right z-50 absolute' onClick={closeSidebar}>
				<FontAwesomeIcon icon={faBars} />
			</div>

		</div>}
		<div className={`h-fill transition-[width] duration-200 ease-in-out absolute z-50 lg:static  ${close? 'w-0 lg:w-[100%]' : 'w-[80vw] md:w-[40vw] lg:w-[100%]'}`}>
			<div className='flex flex-col bg-gradient-to-b from-black via-gray-900 to-black shadow-md rounded-e-3xl overflow-hidden ease-in-out h-[calc(100dvh)]'>
				{ChildActionComp && <div className='mt-2'>
					<ChildActionComp />
				</div>}
				{allowClosage && <div className='p-5 m-2 text-right lg:hidden' onClick={closeSidebar}>
					<FontAwesomeIcon icon={faCircleXmark} />
				</div>}
				<div className='flex flex-col justify-between h-[100%] overflow-scroll'>
					<div>
						{!chatsLoading && elements.map((element: TChat) => {
							return <SidebarElement key={element.id} element={element} page='chats' />;
						})}
						{chatsLoading && <div className=''>
							{Array(10)
								.fill(1)
								.map((_:any, i) => {
									return <SidebarElement key={i} skeleton={true}/>;
								})}
						</div>}
					</div>
					<div className='pb-5 flex flex-row justify-center px-2 shadow-2xl space-x-3'>
						<Link href={'/profile'}>
							<FontAwesomeIcon size={'2x'} icon={faGear}/>
						</Link>
						<LogoutIcon />
					</div>
				</div>
			</div>
		</div>

	</>;
}