import { css } from "emotion";
import PropTypes from "prop-types";

/**
 *
 * Render a Slate block.
 *
 * @param {Object} ctx - The global context object, e.g. "this".
 * @param {Object} props - The editor's props.
 * @param {Function} next - A function that calls the next function.
 *
 * @returns {Element} Block.
 *
 */

function renderBlock(ctx, props, next) {
	const { attributes, children, node, isFocused } = props;
	let align = node.data.get("align");
	// Reset the align onClick on the currently active button
	if (!align) {
		align = "left";
	}

	switch (node.type) {
	case "paragraph":
		return <p {...attributes} style={{ textAlign: ctx.props.textAlign && `${align}` }}>{children}</p>;
	case "block-quote":
		return <blockquote {...attributes} style={{ textAlign: `${align}`, color: "grey", borderLeft: "3px solid grey", paddingLeft: "15px" }}>{children}</blockquote>;
	case "bulleted-list":
		return <ul {...attributes} style={{ listStylePosition: "inside" }}>{children}</ul>;
	case "heading-one":
		return <h1 {...attributes} style={{ textAlign: `${align}` }}>{children}</h1>;
	case "heading-two":
		return <h2 {...attributes} style={{ textAlign: `${align}` }}>{children}</h2>;
	case "heading-three":
		return <h3 {...attributes} style={{ textAlign: `${align}` }}>{children}</h3>;
	case "heading-four":
		return <h4 {...attributes} style={{ textAlign: `${align}` }}>{children}</h4>;
	case "heading-five":
		return <h5 {...attributes} style={{ textAlign: `${align}` }}>{children}</h5>;
	case "heading-six":
		return <h6 {...attributes} style={{ textAlign: `${align}` }}>{children}</h6>;
	case "list-item":
		return <li {...attributes} style={{ textAlign: `${align}` }}>{children}</li>;
	case "numbered-list":
		return <ol {...attributes} style={{ listStylePosition: "inside" }}>{children}</ol>;
	case "image": {
		const src = node.data.get("src");
		return (
			<img
				{...attributes}
				src={src}
				className={css`
					display: block;
					max-width: 100%;
					max-height: 20em;
					box-shadow: ${isFocused ? "0 0 0 2px blue;" : "none"};
				`}
			/>
		);
	}
	default:
		return next();
	}
}

renderBlock.propTypes = {
	ctx: PropTypes.object.isRequired,
	props: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
};

export default renderBlock;
