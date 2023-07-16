import ChildLayout from '@/components/childLayout';

export default function RegisterLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ChildLayout>
			<section>
				<nav></nav>
				{children}
			</section>
		</ChildLayout>
	);
}