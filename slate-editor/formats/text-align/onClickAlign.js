import PropTypes from "prop-types";

import hasAlign from "./hasAlign";
import { hasBlock } from "../../blocks";

/**
 * Check if the any of the currently selected blocks are of data "align".
 *
 * @param {node} align - a string value to compare with one in the the editor's value/state.
 * @param {state} value - the editor's value/state.
 * @param {ref} editor - the global editor reference.
 * @returns {state} onClickAlign.
 */

const	onClickAlign = (align, value, editor) => {

	// Get src data from the block
	function getImgSrc() {
		let src;
		editor.value.focusBlock.data.map((item, index) => {
			if (index === "src") {
				src = item;
			}
		});
		return src;
	}

	// Check if the block is Image
	const isImage = hasBlock(value, "image");

	if (hasAlign(align, value)) {
		if (isImage) {
			return editor.setBlocks({
				data: {
					"src": getImgSrc(),
				},
			}).focus();
		}
		return editor.setBlocks({
			data: {},
		}).focus();
	}

	if (isImage) {
		return editor.setBlocks({
			data: {
				"src": getImgSrc(),
				align,
			},
		}).focus();
	}

	return editor.setBlocks({
		data: { align },
	}).focus();
};

onClickAlign.propTypes = {
	align: PropTypes.string.isRequired,
	value: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
};

export default onClickAlign;

// NOTES:
// This is related to the editing state of the block accessed by a key (for example, when we are at the children block right now, but we need to change parent block state, etc)
// https://docs.slatejs.org/slate-core/commands#setnodebykey-path
// editor.setNodeByKey("4", {
// 	data: { align },
// });
