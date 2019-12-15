import PropTypes from "prop-types";

/**
 *
 * Check if the current selection has a mark with `type` in it.
 *
 * @param {State} value - An Editor's state/value.
 * @param {String} type - A string that represents a mark type.
 *
 * @returns {Boolean} hasMark.
 *
 */

const hasMark = (value, type) => value.activeMarks.some(mark => mark.type === type);

hasMark.propTypes = {
	value: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default hasMark;
