import axios from "axios";
import PropTypes from "prop-types";

/**
 * Remove data from the DB.
 *
 * @param {String} POST_URL - A URL for making POST request.
 */

function remove(POST_URL) {
	const _id = localStorage.getItem("CONTENT_ID");
	if (!_id) {
		alert("You have to save something first.");
	} else {
		axios.delete(POST_URL, {
			params: {
				_id,
			},
		}).then(() => {
			localStorage.removeItem("CONTENT");
			localStorage.removeItem("CONTENT_ID");
			alert("Successfully deleted from DB!");
		}).catch(error => {
			console.log(error);
		});
	}
}

remove.propTypes = {
	POST_URL: PropTypes.string.isRequired,
};

export default remove;
