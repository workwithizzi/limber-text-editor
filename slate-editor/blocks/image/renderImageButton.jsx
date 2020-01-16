import PropTypes from "prop-types";

import { Button } from "../../core";

import hasBlock from "../hasBlock";
import onClickImage from "./onClickImage";

/**
 *
 * Render a block-toggling toolbar button.
 *
 * @param {Object} ctx - The global context object, e.g. "this".
 * @param {String} type - A string that defines a type of a block.
 * @param {String} icon - A string that defines the icon from the "material-icons".
 *
 * @returns {Element} Toolbar Block Button.
 *
 */

function renderImageButton(ctx, type, icon) {

	const { state, editor } = ctx;

	const isActive = hasBlock(state.value, type);

	return (
		<Button
			active={isActive}
			onMouseDown={event => onClickImage(event, editor)}
		>
			{icon}
		</Button>
	);
}

renderImageButton.propTypes = {
	ctx: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default renderImageButton;
