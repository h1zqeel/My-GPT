'use client';
import { getSession } from '@/redux/features/sessionSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
export function SessionProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	useEffect(()=>{
		dispatch(getSession(false));
	}, []);
	return <>
		{children}
	</>;
}
