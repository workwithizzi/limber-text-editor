import PropTypes from "prop-types";

import hasBlock from "./hasBlock";

/**
 * When a block button is clicked, toggle the block type.
 *
 * @param {Event} event - Any dom action.
 * @param {Object} ctx - The global context from main class, e.g. "this".
 * @param {String} type - A string that defines the type of the block, e.g. "numbered-list", "bulleted-list".
 */

function onClickBlock(event, ctx, type) {
	event.preventDefault();

	const { editor, state, props } = ctx;
	const { value } = editor;
	const { document } = value;

	// Handle everything but list buttons.
	if (type !== "bulleted-list" && type !== "numbered-list") {
		const isActive = hasBlock(state.value, type);
		const isList = hasBlock(state.value, "list-item");

		if (isList) {
			editor
				.setBlocks(isActive ? props.defaultNode : type)
				.unwrapBlock("bulleted-list")
				.unwrapBlock("numbered-list");
		} else {
			editor.setBlocks(isActive ? props.defaultNode : type);
		}
	} else {
		// Handle the extra wrapping required for list buttons.
		const isList = hasBlock(state.value, "list-item");
		const isType = value.blocks.some(block => {
			return !!document.getClosest(block.key, parent => parent.type === type);
		});

		if (isList && isType) {
			editor
				.setBlocks(props.defaultNode)
				.unwrapBlock("bulleted-list")
				.unwrapBlock("numbered-list");
		} else if (isList) {
			editor
				.unwrapBlock(
					type === "bulleted-list" ? "numbered-list" : "bulleted-list"
				)
				.wrapBlock(type);
		} else {
			editor.setBlocks("list-item").wrapBlock(type);
		}
	}
}

onClickBlock.propTypes = {
	event: PropTypes.object.isRequired,
	ctx: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default onClickBlock;
