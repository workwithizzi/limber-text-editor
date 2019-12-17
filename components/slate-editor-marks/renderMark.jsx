import PropTypes from "prop-types";

/**
 *
 * Render a Slate mark.
 *
 * @param {Object} props
 * @param {Function} next - The function that calls the next function.
 *
 * @return {Element} DOM element.
 *
 */

function renderMark(props, next) {
	const { children, mark, attributes } = props;
	switch (mark.type) {
	case "bold":
		return <strong {...attributes}>{children}</strong>;
	case "code":
		return <code {...attributes} style={{ backgroundColor: "#D3D3D3", color: "#D66A00" }}>{children}</code>;
	case "italic":
		return <em {...attributes}>{children}</em>;
	case "underlined":
		return <u {...attributes}>{children}</u>;
	default:
		return next();
	}
}

renderMark.propTypes = {
	props: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default renderMark;
