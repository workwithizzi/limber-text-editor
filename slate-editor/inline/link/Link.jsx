import PropTypes from "prop-types";

/**
 * Render link element.
 *
 * @param {Node} node - "props.node" that passed from the Editor main class.
 * @param {Props} attributes - "props.attributes" that passed from the Editor main class.
 * @param {Function} onClick - A function that detects the correct position for DialogWindow rendering.
 * @param {React_element} children - A content, that coming into the <a />.
 * @returns {DOM_element} <a />.
 */

const Link = ({ node, attributes, onClick, children }) => {

	const { data } = node;
	const href = data.get("href");

	return <a {...attributes} href={href} onClick={onClick}>
		{children}
	</a>;
};

Link.propTypes = {
	node: PropTypes.objectOf(PropTypes.object).isRequired,
	attributes: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.array.isRequired,
};

export default Link;
