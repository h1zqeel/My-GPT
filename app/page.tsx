import Image from 'next/image';
import { Landing } from '@/components/Landing';

export default function Home() {
	return (
		<main>
			<div className='min-h-[calc(100dvh)] flex flex-col items-center justify-between'>
				<div className='flex flex-col-reverse lg:flex-row items-center px-8 lg:p-24'>
					<div className='lg:w-9/12 flex flex-col'>
						<span className='text-3xl font-bold'>Custom AI bots made easy<br></br></span>
						<br/>
						<span className='text-sm md:text-xl lg:text-2xl flex flex-col'>
							<span className='text-7xl md:text-8xl lg:text-9xl font-bold'>My-GPT</span><br/><span className='font-medium'>A Chat GPT Client that lets you consume GPT Models using your OpenAI Key</span>
						</span>
						<div className='flex flex-row justify-center pt-8 lg:space-x-4 mb-10 md:mb-5 lg:mb-0'>
							<Landing/>
						</div>
					</div>
					<div className='lg:w-4/12 flex flex-col items-start'>
						<Image src='https://my-gpt-axq.pages.dev/landing-image.png' width={440} height={800} alt="Picture of the author" priority={true} />
					</div>
				</div>
				<p className='p-2 text-lg'>© h1zqeel</p>
			</div>
		</main>
	);
}
