'use client';

import Chat from '@/components/Chat';
import React, { use } from 'react';


export default function Chats(props: { params: Promise<{ id: string }> }) {
	const params = use(props.params);
	return <Chat id={params.id} />;
}