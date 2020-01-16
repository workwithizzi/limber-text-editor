import { isKeyHotkey } from "is-hotkey";
import PropTypes from "prop-types";

/**
 * On key down, if it's a formatting command toggle a mark.
 *
 * @param {Event} event - Any DOM action.
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {Function} next - A function that calls the next() chaining function.
 * @returns {String} mark.
 */

function onKeyDown(props, event, editor, next) {
	let mark;
	if (props.bold & isKeyHotkey("mod+b")(event)) {
		mark = "bold";
	} else if (props.italic & isKeyHotkey("mod+i")(event)) {
		mark = "italic";
	} else if (props.underline & isKeyHotkey("mod+u")(event)) {
		mark = "underlined";
	} else if (props.code & isKeyHotkey("mod+`")(event)) {
		mark = "code";
	} else {
		return next();
	}

	event.preventDefault();
	editor.toggleMark(mark);
}

onKeyDown.propTypes = {
	props: PropTypes.object.isRequired,
	event: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default onKeyDown;
