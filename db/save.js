import axios from "axios";
import PropTypes from "prop-types";

/**
 * Save data to the DB.
 *
 * @param {String} POST_URL - A URL for making POST request.
 * @param {Object} value - The editor's value from state.
 */

function save(POST_URL, value) {
	axios.post(POST_URL, {
		content: value,
	}).then(res => {
		localStorage.setItem("CONTENT_ID", res.data);
		alert("Successfully saved to DB!");
	}).catch(error => {
		console.log(error);
	});
}

save.propTypes = {
	POST_URL: PropTypes.string.isRequired,
	value: PropTypes.object.isRequired,
};

export default save;
