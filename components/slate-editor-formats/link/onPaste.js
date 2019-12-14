import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import hasLinks from "./hasLinks";
import wrapLink from "./wrapLink";
import unwrapLink from "./unwrapLink";

/**
 * On paste, if the text is a link, wrap the selection in a link.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 */

function onPaste(event, editor, value) {
	if (editor.value.selection.isCollapsed) return;

	const transfer = getEventTransfer(event);
	const { type, text } = transfer;
	if (type !== "text" && type !== "html") return;
	if (!isUrl(text)) return;

	if (hasLinks(value)) {
		editor.command(unwrapLink);
	}
	editor.command(wrapLink, text);
	event.preventDefault();
}

onPaste.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default onPaste;
