import PropTypes from "prop-types";

import hasLinks from "./hasLinks";
import unwrapLink from "./unwrapLink";
import wrapLink from "./wrapLink";

/**
 * When clicking a link, if the selection has a link in it, remove the link.
 * Otherwise, add a new link with an href and text.
 *
 * @param {Event} event - Any DOM action.
 * @param {Edito} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 *
 */

function onClickLink(event, editor, value) {
	event.preventDefault();

	if (hasLinks(value)) {
		editor.command(unwrapLink);
	} else if (value.selection.isExpanded) {
		const href = window.prompt("Enter the URL of the link:");

		if (href == null) {
			return;
		}

		editor.command(wrapLink, href);
	} else {
		const href = window.prompt("Enter the URL of the link:");

		if (href == null) {
			return;
		}

		const text = window.prompt("Enter the text for the link:");

		if (text == null) {
			return;
		}

		editor
			.insertText(text)
			.moveFocusBackward(text.length)
			.command(wrapLink, href);
	}
}

onClickLink.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default onClickLink;
