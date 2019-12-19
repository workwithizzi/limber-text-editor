import PropTypes from "prop-types";

/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor - The global editor reference, e.g. "this.editor".
 * @param {String} src - An Image's "src" attribute.
 * @param {Range} target - An Editor's target.
 */

function insertImage(editor, src, target) {
	if (target) {
		editor.select(target);
	}

	editor.insertBlock({
		type: "image",
		data: { src },
	});
}

insertImage.propTypes = {
	editor: PropTypes.object.isRequired,
	src: PropTypes.string.isRequired,
	target: PropTypes.string.isRequired,
};

export default insertImage;
