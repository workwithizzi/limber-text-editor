import PropTypes from "prop-types";

import { Button } from "../slate-editor-core";

import hasBlock from "./hasBlock";
import onClickBlock from "./onClickBlock";

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

function renderBlockButton(ctx, type, icon) {

	const { state } = ctx;

	let isActive = hasBlock(state.value, type);

	if (["numbered-list", "bulleted-list"].includes(type)) {
		const {
			value: { document, blocks },
		} = state;

		if (blocks.size > 0) {
			const parent = document.getParent(blocks.first().key);
			isActive = hasBlock(state.value, "list-item") && parent && parent.type === type;
		}
	}

	return (
		<Button
			active={isActive}
			onMouseDown={event => onClickBlock(event, ctx, type)}
		>
			{icon}
		</Button>
	);
}

renderBlockButton.propTypes = {
	ctx: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default renderBlockButton;
