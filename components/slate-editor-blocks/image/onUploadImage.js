import PropTypes from "prop-types";

import { readImage, insertImage, saveImageToFS } from "./index";

/**
 * Upload Image and Add it to the Editor's value/state.
 *
 * @param {Object} ctx - The global context object, e.g. "this".
 */

async function onUploadImage(ctx) {
	const { files } = event.target;
	const { editor } = ctx;

	const target = editor.findEventRange(event);

	try {
		const result = await readImage(files);
		const img = await saveImageToFS(result);

		editor.command(insertImage, `/static/${img}`, target);
	} catch(error) {
		console.log(error);
	}
}

onUploadImage.propTypes = {
	ctx: PropTypes.object.isRequired,
};

export default onUploadImage;
