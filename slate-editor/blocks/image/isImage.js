import imageExtensions from "image-extensions";

import getExtension from "./getExtension";

/**
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

function isImage(url) {
	return imageExtensions.includes(getExtension(url));
}

export default isImage;
