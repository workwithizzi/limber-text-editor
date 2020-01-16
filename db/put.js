import axios from "axios";
import PropTypes from "prop-types";

/**
 * Put data to the DB.
 *
 * @param {String} POST_URL - A URL for making POST request.
 * @param {Object} value - The editor's value from state.
 */

function put(POST_URL, value) {
	const _id = localStorage.getItem("CONTENT_ID");
	if (!_id) {
		alert("You have to save something first.");
	} else {
		axios.put(POST_URL, {
			_id,
			content: value,
		}).then(() => {
			alert("Successfully updated to DB!");
		}).catch(error => {
			console.log(error);
		});
	}
}

put.propTypes = {
	POST_URL: PropTypes.string.isRequired,
	value: PropTypes.object.isRequired,
};

export default put;
