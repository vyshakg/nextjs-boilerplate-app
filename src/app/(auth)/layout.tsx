import React, { FunctionComponent } from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col justify-center items-center min-h-svh bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">{children}</div>
		</div>
	);
};

export default Layout;
