import PropTypes from "prop-types";

import uploadImage from "./uploadImage";
import insertImage from "./insertImage";

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
		const result = await uploadImage(files);
		editor.command(insertImage, result, target);
	} catch(error) {
		console.log(error);
	}
}

onUploadImage.propTypes = {
	ctx: PropTypes.object.isRequired,
};

export default onUploadImage;
