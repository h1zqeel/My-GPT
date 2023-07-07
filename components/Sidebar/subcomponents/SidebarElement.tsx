const SidebarElement = ({ icon = '', text = '', onClick = ()=>{} }: any) => {
	return (
		<div className="transition-colors duration-150 flex items-center m-2 rounded-md p-2 cursor-pointer hover:bg-sky-700 w-64 overflow-hidden " onClick={onClick}>
			{icon}
			<p>{text}</p>
		</div>
	);
};

export default SidebarElement;