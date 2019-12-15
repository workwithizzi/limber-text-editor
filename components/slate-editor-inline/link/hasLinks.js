import PropTypes from "prop-types";

/**
 * Check whether the current selection has a link in it.
 *
 * @param {State} value - the editor's value/state.
 *
 * @returns {Boolean} hasLinks.
 */

const hasLinks = value => value.inlines.some(inline => inline.type === "link");

hasLinks.propTypes = {
	value: PropTypes.object.isRequired,
};

export default hasLinks;
