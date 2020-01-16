import PropTypes from "prop-types";

/**
 * Check if the any of the currently selected blocks are of "type".
 *
 * @param {State} value - The Editor's state/value, e.g. "this.state.value".
 * @param {*} type - A string that represents the type of the block.
 * @returns {Boolean} hasBlock.
 */

const hasBlock = (value, type) => 
	value.blocks.some(node => node.type === type);

hasBlock.propTypes = {
	value: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default hasBlock;
