'use client';

import Chat from '@/components/Chat';
import React from 'react';


export default function Chats({ params }: { params: { id: string } })	{
	return <Chat id={params.id} />;
}