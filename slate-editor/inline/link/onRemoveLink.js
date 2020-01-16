import PropTypes from "prop-types";

import hasLinks from "./hasLinks";
import unwrapLink from "./unwrapLink";

/**
 * Remove link formatting if the selected text is a link.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 */

function onRemoveLink(editor, value) {
	if (hasLinks(value)) {
		unwrapLink(editor);
	}
}

onRemoveLink.propTypes = {
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default onRemoveLink;
