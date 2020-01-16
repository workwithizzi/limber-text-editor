import { Value } from "slate";
import axios from "axios";
import PropTypes from "prop-types";

/**
 * GET data from the DB.
 *
 * @param {Object} ctx - The global context object, e.g. "this".
 * @param {String} GET_URL - A URL for making GET request.
 */

function get(ctx, GET_URL) {
	const _id = localStorage.getItem("CONTENT_ID");
	if (!_id) {
		alert("You have to save something first.");
	} else {
		axios.get(GET_URL, {
			params: {
				_id,
			},
		}).then(res => {
			const content = res.data.content;
			localStorage.setItem("CONTENT", JSON.stringify(content));
			ctx.setState({
				value: Value.fromJSON(content),
			});
			alert("Successfully loaded from DB!");
		}).catch(error => {
			console.log(error);
		});
	}
}

get.propTypes = {
	ctx: PropTypes.object.isRequired,
	GET_URL: PropTypes.string.isRequired,
};

export default get;
