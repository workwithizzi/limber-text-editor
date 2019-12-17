/**
 * 
 * Check if the any of the currently selected blocks are of data "align".
 * 
*/

import PropTypes from "prop-types";

import hasAlign from "./hasAlign";

/**
 * 
 * @param {node} align - a string value to compare with one in the the editor's value/state.
 * @param {state} value - the editor's value/state.
 * @param {ref} editor - the global editor reference.
 * 
 * @returns {state} onClickAlign.
 * 
 */

const	onClickAlign = (align, value, editor) => {

	// This is related to the editing state of the block accessed by a key (for example, when we are at the children block right now, but we need to change parent block state, etc)
	// https://docs.slatejs.org/slate-core/commands#setnodebykey-path
	// editor.setNodeByKey("4", {
	// 	data: { align },
	// });

	if (hasAlign(align, value)) {
		return editor.setBlocks({
			data: {},
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
