/**
 * 
 * Check whether the current selection has a link in it.
 *
 * @param {state} value - the editor's value/state.
 * 
 * @returns {Boolean} hasLinks.
 * 
 */

import PropTypes from "prop-types";

const hasLinks = value => {
	return value.inlines.some(inline => inline.type === "link");
};

hasLinks.propTypes = {
	value: PropTypes.object.isRequired,
};

export default hasLinks;
