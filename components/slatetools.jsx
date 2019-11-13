import React from "react";
import { cx, css } from "emotion";

// Editor Menu Button
export const Button = React.forwardRef(
	({ className, active, reversed, icon, ...props }, ref) => (
		<span
			ref={ref}
			className={cx(
				className,
				css`
					cursor: pointer;
					color: ${reversed
						? active
							? "white"
							: "#aaa"
						: active
						? "black"
						: "#ccc"};
				`
			)}
		>
			{/* Icon */}
			<span
				{...props}
				className={cx(
					"material-icons",
					className,
					css`
						font-size: 18px;
						vertical-align: text-bottom;
					`
				)}
			/>
		</span>
	)
);

// Editor Toolbar
export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
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
