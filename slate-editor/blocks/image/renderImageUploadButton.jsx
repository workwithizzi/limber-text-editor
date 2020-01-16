import PropTypes from "prop-types";

import onUploadImage from "./onUploadImage";

/**
 * Render input controller to upload image.
 *
 * @param {Object} ctx - The global context object, "this".
 * @returns {Element} renderImageUploadButton.
 */

function renderImageUploadButton(ctx) {
	return (
		<input
			name="image"
			type="file"
			accept="image/*"
			onChange={() => onUploadImage(ctx)}
		/>
	);
}

renderImageUploadButton.propTypes = {
	ctx: PropTypes.object.isRequired,
};

export default renderImageUploadButton;
