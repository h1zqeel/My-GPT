'use client';

import React, { useState } from 'react';

import SidebarElement from './subcomponents/SidebarElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TSidebarProps } from '@/types/Sidebar';
import { TChat } from '@/types/Chat';
import { useAppSelector } from '@/redux/hooks';

export default function Sidebar({ elements, allowClosage = true, ChildActionComp }: TSidebarProps)	{
	const [close, setClose] = useState(false);

	const closeSidebar = () => {
		setClose(!close);
	};

	const chatsLoading = useAppSelector(({ chatsReducer }) => chatsReducer.loading);

	return <> <div className={`h-screen transition-[width] duration-200 ease-in-out absolute z-50 lg:static ${close? 'w-0' : 'w-4/5 lg:w-1/5 md:w-2/5'}`}>
		<div className='flex flex-col bg-secondBackground h-screen overflow-hidden ease-in-out'>
			{ChildActionComp && <div className='mt-2'>
				<ChildActionComp />
			</div>}
			{allowClosage && <div className='p-5 m-2 text-right lg:hidden' onClick={closeSidebar}>
				<FontAwesomeIcon icon={faCircleXmark} />
			</div>}

			{!chatsLoading && elements.map((element: TChat) => {
				return <SidebarElement key={element.id} element={element} page='chats' />;
			})}
			{chatsLoading && <div className='mt-10'>
				{Array(10)
					.fill(1)
					.map((_:any, i) => {
						return <SidebarElement key={i} skeleton={true}/>;
					})}
			</div>}
		</div>
	</div>
	{<div className='' style={{
		opacity: !close ? '0' : '1',
		transitionProperty: 'opacity',
		transitionDuration: '150ms'
	}}>
		<div className='p-5 m-2 text-right' onClick={closeSidebar}>

			<FontAwesomeIcon icon={faBars} />
		</div>

	</div>}

	</>;
}