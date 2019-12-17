/**
 * 
 * Render TextAlign Buttons to the Toolbar Menu.
 *
*/

import PropTypes from "prop-types";

import { Button } from "../../slate-editor-core";
import hasAlign from "./hasAlign";
import onClickAlign from "./onClickAlign";

/**
 * Render single TextAlign button.
 * @param {align} type - a string that specifies the align.
 * @param {state} value - the editor's value/state.
 * @param {string} icon - a string that defines the icon element from material icons library.
 * @param {ref} editor - the global editor reference.
 * 
 * @returns {DOM_element} renderAlignButton.
 * 
 */

export const renderAlignButton = (type, value, icon, editor) => {
	const isActive = hasAlign(type, value);
	return (
		<Button
			key={type}
			active={isActive}
			onMouseDown={() => onClickAlign(type, value, editor)}
		>
			{icon}
		</Button>
	);
};

renderAlignButton.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.object.isRequired,
	icon: PropTypes.string.isRequired,
	editor: PropTypes.object.isRequired,
};

/**
 * Render a group of TextAlign buttons.
 * @param {prop} textAlign - a property passed from the parent component
 * 
 * @returns {DOM_elements} renderAlignButtons.
 * 
 */

export const renderAlignButtons = (textAlign, value, editor) => {
	return textAlign.map(align =>
		renderAlignButton(align, value, `format_align_${align}`, editor)
	);
};

renderAlignButtons.propTypes = {
	textAlign: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
	]).isRequired,
	value: PropTypes.object.isRequired,
	editor: PropTypes.object.isRequired,
};
