import PropTypes from "prop-types";

function uploadImage(files) {

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		const [mime] = files[0].type.split("/");
		if (mime === "image") {
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(files[0]);
		}
		return;
	});
}

uploadImage.propTypes = {
	files: PropTypes.object.isRequired,
};

export default uploadImage;
