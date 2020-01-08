import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import { hasLinks, wrapLink, unwrapLink } from "../slate-editor-inline/link";

import insertImage from "../slate-editor-blocks/image/insertImage";
import isImage from "../slate-editor-blocks/image/isImage";

/**
 * On paste, if the text is a link, wrap the selection in a link.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 */

function onPaste(event, editor, value, next) {
	const target = editor.findEventRange(event);
	if (!target && event.type === "drop") return;
	const transfer = getEventTransfer(event);
	const { type, text, files } = transfer;

	if (type === "files") {
		for (const file of files) {
			const reader = new FileReader();
			const [mime] = file.type.split("/");
			if (mime !== "image") continue;

			reader.addEventListener("loadend", () => {
				editor.command(insertImage, reader.result, target);
			});

			reader.readAsDataURL(file);
		}
		return;
	}

	if (isUrl(text)) {
		if (editor.value.selection.isCollapsed) return;
		if (hasLinks(value)) {
			editor.command(unwrapLink);
		}
		editor.command(wrapLink, text);
		event.preventDefault();
		return;
	}

	if (type === "text") {
		if (!isUrl(text)) return next();
		if (!isImage(text)) return next();

		if (isImage(text)) {
			editor.command(insertImage, text, target);
		}
		return;
	}

	next();
}

onPaste.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default onPaste;
