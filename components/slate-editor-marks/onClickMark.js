import PropTypes from "prop-types";

/**
 *
 * When a mark button is clicked, toggle the current mark.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {String} type - A string that corresponds to the mark type, e.g. "bold", "italic".
 *
 */
function onClickMark(event, editor, type) {
	event.preventDefault();
	editor.toggleMark(type);
}

onClickMark.propTypes = {
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

export default onClickMark;
