import PropTypes from "prop-types";

/**
 * Check whether align options is array.
 * 
 * @param {prop} textAlign - textAlign prop from the parent component.
 * @returns {Boolean} hasMultipleAligns.
 */

const hasMultipleAligns = textAlign => Array.isArray(textAlign);

hasMultipleAligns.propTypes = {
	textAlign: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
	]).isRequired,
};

export default hasMultipleAligns;
