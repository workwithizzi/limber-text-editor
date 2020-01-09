import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import { insertImage, readImage, saveImageToFS, isImage } from "./index";

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
		readImage(files).then(result => {
			saveImageToFS(result).then(img => {
				editor.command(insertImage, `/static/${img}`, target);
			}).catch(error => console.error(error));
		}).catch(error => console.error(error));
		return next();
	}

	// TODO: find an applicable example for this case
	if (type === "text") {
		if (!isUrl(text)) return;
		if (!isImage(text)) return;
		console.log("The text is an image");
		editor.command(insertImage, text, target);
	}

	next();
};

onDropImage.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default onDropImage;
