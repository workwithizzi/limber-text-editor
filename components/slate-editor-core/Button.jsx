import React from "react";
import { cx, css } from "emotion";

// Editor Menu Button
export default React.forwardRef(
	({ className, active, reversed, icon, ...props }, ref) => (
		<span
			ref={ref}
			className={cx(
				className,
				css`
					cursor: pointer;
					color: ${reversed ? active
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
