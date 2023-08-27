import ChildLayout from '@/components/childLayout';

export default function LoginLayout({ children }: {
	children: React.ReactNode
}) {
	return (
		<ChildLayout>
			<section>
				{children}
			</section>
		</ChildLayout>
	);
}