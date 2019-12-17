import PropTypes from "prop-types";

/**
 * Detect the position of the dialog window to be rendered.
 *
 * @param {Event} event - Any event passed from the parent component.
 * @param {Context} ctx - A global context object, e.g. "this".
 *
 */

function setDialogPosition(event, ctx) {

	const target = event.target;
	const distanceFromTop = target.getBoundingClientRect().top;
	const distanceFromLeft = target.getBoundingClientRect().left; 

	ctx.setState({
		cursorPosition: {
			x: distanceFromLeft,
			y: distanceFromTop,
		},
		isDialog: true,
	});
}

setDialogPosition.propTypes = {
	event: PropTypes.object.isRequired,
	ctx: PropTypes.object.isRequired,
};

export default setDialogPosition;
