import PropTypes from "prop-types";

/**
 * Read Image from the File System.
 *
 * @param {Object} files - The files data object.
 * @returns {Promise} readImage.
 */
function readImage(files) {

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		const [mime] = files[0].type.split("/");
		if (mime === "image") {
			reader.onload = () => {
				resolve(files[0]);
			};
			reader.onerror = reject;
			reader.readAsDataURL(files[0]);
		}
		return;
	});
}

readImage.propTypes = {
	files: PropTypes.object.isRequired,
};

export default readImage;
