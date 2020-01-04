import PropTypes from "prop-types";

import onEditLink from "./onEditLink";
import onRemoveLink from "./onRemoveLink";

/**
 * Render dialog button when clicked on the link.
 *
 * @param {Function} setWrapperRef - A function that adds the "ref" to the div.
 * @param {Editor} editor - A global editor reference, e.g. "this.ditor".
 * @param {State} value - An editor's value/state.
 * @param {State} cursorPosition - A cursor's position state.
 *
 * @returns {DOM_element} <div />
 *
 */

function renderLinkDialogWindow(setWrapperRef, editor, value, cursorPosition) {

	if (value.inlines.some(inline => inline.type === "link")) {
		// get url value
		let href = "";
		value.inlines.some(inline => {
			href = inline.data.get("href");
		});

		// setup the correct top and left distance for the dialog
		const top = cursorPosition.y + window.screenTop;
		const left = cursorPosition.x;

		// display toaster a bit below the href as at Quill.
		return (
			<div
				ref={setWrapperRef}
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					position: "absolute",
					top: `${top}px`,
					left: `${left}px`,
					backgroundColor: "grey",
					width: "250px",
				}}>
				<span style={{ maxWidth: "120px"}}>Visit URL: <a href={href}>{href}</a></span>
				<span>
					<button onClick={() => onEditLink(editor, value)}>Edit</button>
					<button onClick={() => onRemoveLink(editor, value)}>Remove</button>
				</span>
			</div>
		);
	}
}

renderLinkDialogWindow.propTypes = {
	setWrapperRef: PropTypes.func.isRequired,
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
	cursorPosition: PropTypes.object.isRequired,
};

export default renderLinkDialogWindow;
