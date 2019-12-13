/**
 *
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor - the global editor reference.
 *
 */

import PropTypes from "prop-types";

const unwrapLink = editor => {
	editor.unwrapInline("link");
};

unwrapLink.propTypes = {
	editor: PropTypes.object.isRequired,
};

export default unwrapLink;
