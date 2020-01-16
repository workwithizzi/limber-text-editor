import PropTypes from "prop-types";

import insertImage from "./insertImage";

/**
 * On clicking the image button, prompt for an image and insert it.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - The global editor reference, e.g. "this.editor".
 */

function onClickImage(event, editor) {
	event.preventDefault();
	const src = window.prompt("Enter the URL of the image:");
	if (!src) return;
	editor.command(insertImage, src);
}

onClickImage.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
};

export default onClickImage;
