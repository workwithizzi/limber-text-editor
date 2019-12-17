import PropTypes from "prop-types";

import { Button } from "../slate-editor-core";

import hasMark from "./hasMark";
import onClickMark from "./onClickMark";

/**
 *
 * Render a mark-toggling toolbar button.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor"
 * @param {State} value - An editor's state/value, e.g. "this.state.value"
 * @param {String} type - A string that represents the mark type, e.g. "bold", "italic".
 * @param {String} icon - A string that represents the name of the icon from "material-icons".
 *
 * @returns {DOM_element} Mark Button.
 *
 */

function renderMarkButton(editor, value, type, icon) {
	const isActive = hasMark(value, type);

	return (
		<Button
			active={isActive}
			onMouseDown={event => onClickMark(event, editor, type)}
		>
			{icon}
		</Button>
	);
}

renderMarkButton.propTypes = {
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default renderMarkButton;
