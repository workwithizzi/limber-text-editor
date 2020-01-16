import PropTypes from "prop-types";

/**
 * Check if the any of the currently selected blocks are of data "align".
 *
 * @param {node} align - a string value to compare with one in the the editor's value/state.
 * @param {state} value - the editor's value/state.
 * @returns {Boolean} hasAlign.
 */

const hasAlign = (align, value) => {
	return value.blocks.some(node => node.data.get("align") === align);
};

hasAlign.propTypes = {
	align: PropTypes.string.isRequired,
	value: PropTypes.object.isRequired,
};

export default hasAlign;
