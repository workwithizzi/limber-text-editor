import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import insertImage from "./insertImage";
import isImage from "./isImage";

/**
 * On drop, insert the image wherever it is dropped.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {Function} next - A function that executes the next() action.
 */

const onDropImage = (event, editor, next) => {
	event.preventDefault();

	const target = editor.findEventRange(event);
	if (!target && event.type === "drop") return next();

	const transfer = getEventTransfer(event);
	const { type, text, files } = transfer;

	if (type === "files") {
		for (const file of files) {
			const reader = new FileReader();
			const [mime] = file.type.split("/");
			if (mime === "image") {
				reader.addEventListener("load", () => {
					editor.command(insertImage, reader.result, target);
				});

				reader.readAsDataURL(file);
			}
		}
		return next();
	}

	if (type === "text") {
		if (!isUrl(text)) return;
		if (!isImage(text)) return;
		return editor.command(insertImage, text, target);
	}

	next();
};

onDropImage.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default onDropImage;
