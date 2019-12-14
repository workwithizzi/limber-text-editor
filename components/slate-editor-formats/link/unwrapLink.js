import PropTypes from "prop-types";

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 */

function unwrapLink(editor) {
	editor.unwrapInline("link");
}

unwrapLink.propTypes = {
	editor: PropTypes.object.isRequired,
};

export default unwrapLink;
