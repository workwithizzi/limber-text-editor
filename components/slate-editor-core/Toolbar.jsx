import React from "react";
import { cx, css } from "emotion";

// Editor Toolbar
export default React.forwardRef(({ className, ...props }, ref) => (
	<div
		{...props}
		ref={ref}
		className={cx(
			className,
			css`
				& > * {
					display: inline-block;
				}

				& > * + * {
					margin-left: 15px;
				}
			`,
			css`
				position: relative;
				padding: 1px 18px 17px;
				margin: 0 -20px;
				border-bottom: 2px solid #eee;
				margin-bottom: 20px;
			`
		)}
	/>
));
