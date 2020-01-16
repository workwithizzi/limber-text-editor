import PropTypes from "prop-types";

/**
 * Get the extension of the URL, using the URL API.
 *
 * @param {String} url - An image url.
 * @return {String} Image Extension.
 */

function getExtension(url) {
	return new URL(url).pathname.split(".").pop();
}

getExtension.propTypes = {
	url: PropTypes.string.isRequired,
};

export default getExtension;
