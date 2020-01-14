import PropTypes from "prop-types";

import Link from "./link/Link";
import setDialogPosition from "./link/setDialogPosition";

/**
 *
 * Render a Slate inline.
 *
 * @param {Context} ctx - The global context, e.g. "this".
 * @param {Object} props - The Editor's properties.
 * @param {Function} next - The function that calls the next function.
 *
 * @return {Element} DOM element.
 *
 */

function renderInline(ctx, props, next) {
	const { attributes, children, node } = props;

	switch (node.type) {
	case "link": {
		return (
			<Link
				node={node}
				attributes={attributes}
				onClick={event => setDialogPosition(event, ctx)}
				children={children}
			/>
		);
	}
	default: {
		return next();
	}
	}
}

renderInline.propTypes = {
	ctx: PropTypes.object.isRequired,
	props: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default renderInline;
