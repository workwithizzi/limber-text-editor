import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import { hasLinks, wrapLink, unwrapLink } from "../inline/link";
import { isImage, insertImage, readImage, saveImageToFS } from "../blocks/image";

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
		readImage(files).then(result => {
			saveImageToFS(result).then(img => {
				editor.command(insertImage, `${process.env.STATIC}/${img}`, target);
			}).catch(error => console.error(error));
		}).catch(error => console.error(error));
		return next();
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

	// TODO: find an applicable example for this case
	if (type === "text") {
		if (!isUrl(text)) return next();
		if (!isImage(text)) return next();

		if (isImage(text)) {
			console.log("The text is an image");
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
