import { toast as t } from 'react-toastify';


export const toast = (message: string, type: string, time?:number) => {
	if(type === 'error') {
		t.error(message, {
			position: 'top-center',
			autoClose: time || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}

	if(type=== 'success') {
		t.success(message, {
			position: 'top-center',
			autoClose: time || 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};
