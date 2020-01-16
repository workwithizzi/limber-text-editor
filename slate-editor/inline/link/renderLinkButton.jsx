import PropTypes from "prop-types";

import { Button } from "../../core";

import hasLinks from "./hasLinks";
import onClickLink from "./onClickLink";

/**
 * Render Link button for Toolbar menu.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 * @param {String} icon - An icon name from the "material-icons".
 * @returns {DOM_element} Toolbar Link Button.
 */

function renderLinkButton(editor, value, icon) {

	const isActive = hasLinks(value);

	return (
		<Button
			active={isActive}
			onMouseDown={event => onClickLink(event, editor, value)}
		>
			{icon}
		</Button>
	);
}

renderLinkButton.propTypes = {
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default renderLinkButton;
