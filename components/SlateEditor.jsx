import React from "react";
import { Editor } from "slate-react";
import { KeyUtils, Value } from "slate";
import { isKeyHotkey } from "is-hotkey";
import PropTypes from "prop-types";

import Button from "./Button";
import Toolbar from "./Toolbar";

// Resets Slate's internal key generating function to its default state.
// See: https://github.com/ianstormtaylor/slate/blob/master/docs/reference/slate/utils.md
KeyUtils.resetGenerator();

// Create our initial value...
const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: "block",
				type: "paragraph",
				nodes: [
					{
						object: "text",
						text: "A line of placeholder text in a paragraph.",
					},
				],
			},
		],
	},
});

// The rich text example.
class SlateEditor extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			// Deserialize the initial editor value.
			value: Value.fromJSON(initialValue),
			rendered: false,
		};
	}

	// Side - Effects
	componentDidMount() {
		this.setState({
			rendered: true,
		});
	}

	// Functions: Event-Handlers
	// On change, save the new `value`.
	onChange = ({ value }) => {
		this.setState({ value });
	};

	// On key down, if it's a formatting command toggle a mark.
	onKeyDown = (event, editor, next) => {
		let mark;
		if (this.props.bold & isKeyHotkey("mod+b")(event)) {
			mark = "bold";
		} else if (this.props.italic & isKeyHotkey("mod+i")(event)) {
			mark = "italic";
		} else if (this.props.underline & isKeyHotkey("mod+u")(event)) {
			mark = "underlined";
		} else if (this.props.code & isKeyHotkey("mod+`")(event)) {
			mark = "code";
		} else {
			return next();
		}

		event.preventDefault();
		editor.toggleMark(mark);
	};

	// When a mark button is clicked, toggle the current mark.
	onClickMark = (event, type) => {
		event.preventDefault();
		this.editor.toggleMark(type);
	};

	// When a block button is clicked, toggle the block type.
	onClickBlock = (event, type) => {
		event.preventDefault();

		const { editor } = this;
		const { value } = editor;
		const { document } = value;

		// Handle everything but list buttons.
		if (type !== "bulleted-list" && type !== "numbered-list") {
			const isActive = this.hasBlock(type);
			const isList = this.hasBlock("list-item");

			if (isList) {
				editor
					.setBlocks(isActive ? this.props.defaultNode : type)
					.unwrapBlock("bulleted-list")
					.unwrapBlock("numbered-list");
			} else {
				editor.setBlocks(isActive ? this.props.defaultNode : type);
			}
		} else {
			// Handle the extra wrapping required for list buttons.
			const isList = this.hasBlock("list-item");
			const isType = value.blocks.some(block => {
				return !!document.getClosest(block.key, parent => parent.type === type);
			});

			if (isList && isType) {
				editor
					.setBlocks(this.props.defaultNode)
					.unwrapBlock("bulleted-list")
					.unwrapBlock("numbered-list");
			} else if (isList) {
				editor
					.unwrapBlock(
						type === "bulleted-list" ? "numbered-list" : "bulleted-list"
					)
					.wrapBlock(type);
			} else {
				editor.setBlocks("list-item").wrapBlock(type);
			}
		}
	};

	// Functions: Checkers
	// Check if the current selection has a mark with `type` in it.
	hasMark = type => {
		const { value } = this.state;
		return value.activeMarks.some(mark => mark.type === type);
	};

	// Check if the any of the currently selected blocks are of `type`.
	hasBlock = type => {
		const { value } = this.state;
		return value.blocks.some(node => node.type === type);
	};

	// Store a reference to the `editor`.
	ref = editor => {
		this.editor = editor;
	};

	// Get the HTML of the Text Editor
	createMarkup = () => {
		return { __html: this.editor.el.innerHTML };
	};

	// Render Helpers
	// Render a mark-toggling toolbar button.
	renderMarkButton = (type, icon) => {
		const isActive = this.hasMark(type);

		return (
			<Button
				active={isActive}
				onMouseDown={event => this.onClickMark(event, type)}
			>
				{icon}
			</Button>
		);
	};

	// Render a block-toggling toolbar button.
	renderBlockButton = (type, icon) => {
		let isActive = this.hasBlock(type);

		if (["numbered-list", "bulleted-list"].includes(type)) {
			const {
				value: { document, blocks },
			} = this.state;

			if (blocks.size > 0) {
				const parent = document.getParent(blocks.first().key);
				isActive = this.hasBlock("list-item") && parent && parent.type === type;
			}
		}

		return (
			<Button
				active={isActive}
				onMouseDown={event => this.onClickBlock(event, type)}
			>
				{icon}
			</Button>
		);
	};

	// Render a Slate block
	renderBlock = (props, editor, next) => {
		const { attributes, children, node } = props;

		switch (node.type) {
		case "block-quote":
			return <blockquote {...attributes}>{children}</blockquote>;
		case "bulleted-list":
			return <ul {...attributes}>{children}</ul>;
		case "heading-one":
			return <h1 {...attributes}>{children}</h1>;
		case "heading-two":
			return <h2 {...attributes}>{children}</h2>;
		case "heading-three":
			return <h3 {...attributes}>{children}</h3>;
		case "heading-four":
			return <h4 {...attributes}>{children}</h4>;
		case "heading-five":
			return <h5 {...attributes}>{children}</h5>;
		case "heading-six":
			return <h6 {...attributes}>{children}</h6>;
		case "list-item":
			return <li {...attributes}>{children}</li>;
		case "numbered-list":
			return <ol {...attributes}>{children}</ol>;
		default:
			return next();
		}
	};

	// Render a Slate mark
	renderMark = (props, editor, next) => {
		const { children, mark, attributes } = props;

		switch (mark.type) {
		case "bold":
			return <strong {...attributes}>{children}</strong>;
		case "code":
			return <code {...attributes}>{children}</code>;
		case "italic":
			return <em {...attributes}>{children}</em>;
		case "underlined":
			return <u {...attributes}>{children}</u>;
		default:
			return next();
		}
	};

	// Main Render
	render() {
		return (
			<>
				<div
					style={{
						maxWidth: "800px",
						margin: "40px auto",
						padding: "20px",
						background: "white",
						color: "#333",
						boxShadow: "0px 16px 24px 0px #A9A9A9",
					}}
				>
					<Toolbar>
						{/* Bold */}
						{this.props.bold && this.renderMarkButton("bold", "format_bold")}

						{/* Italic */}
						{this.props.italic && this.renderMarkButton("italic", "format_italic")}

						{/* Underline */}
						{this.props.underline && this.renderMarkButton("underlined", "format_underlined")}

						{/* Code */}
						{this.props.code && this.renderMarkButton("code", "code")}

						{/* H1 */}
						{this.props.h1 && this.renderBlockButton("heading-one", "looks_one")}

						{/* H2 */}
						{this.props.h2 && this.renderBlockButton("heading-two", "looks_two")}

						{/* H3 */}
						{this.props.h3 && this.renderBlockButton("heading-three", "looks_3")}
						
						{/* H4 */}
						{this.props.h4 && this.renderBlockButton("heading-four", "looks_4")}

						{/* H5 */}
						{this.props.h5 && this.renderBlockButton("heading-five", "looks_5")}

						{/* H6 */}
						{this.props.h5 && this.renderBlockButton("heading-six", "looks_6")}

						{/* Headings*/}
						{this.props.headings && (
							<>
								{this.renderBlockButton("heading-one", "looks_one")}
								{this.renderBlockButton("heading-two", "looks_two")}
								{this.renderBlockButton("heading-three", "looks_3")}
								{this.renderBlockButton("heading-four", "looks_4")}
								{this.renderBlockButton("heading-five", "looks_5")}
								{this.renderBlockButton("heading-six", "looks_6")}
							</>
						)}

						{/* Blockquote */}
						{this.props.blockquote && this.renderBlockButton("block-quote", "format_quote")}

						{/* Ordered List */}
						{this.props.ol && this.renderBlockButton("numbered-list", "format_list_numbered")}

						{/* Unordered List */}
						{this.props.ul && this.renderBlockButton("bulleted-list", "format_list_bulleted")}
					</Toolbar>
					<Editor
						spellCheck
						autoFocus
						placeholder="Enter some rich text..."
						ref={this.ref}
						value={this.state.value}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						renderBlock={this.renderBlock}
						renderMark={this.renderMark}
						style={{ border: "1px solid grey", minHeight: "60px" }}
					/>
				</div>
				<div>
					<p>State (JSON object):</p>
					<pre
						style={{
							background: "#333",
							color: "white",
							margin: "30px 5px",
							padding: "10px",
						}}
					>
						{JSON.stringify(this.state, null, 2)}
					</pre>
				</div>
				{this.state.rendered ? (
					<>
						<p>HTML:</p>
						<div dangerouslySetInnerHTML={this.createMarkup()}></div>
					</>
				) : null}
			</>
		);
	}
}

SlateEditor.defaultProps = {
	// Formats
	bold: false,
	italic: false,
	underline: false,
	code: false,
	h1: false,
	h2: false,
	h3: false,
	h4: false,
	h5: false,
	h6: false,
	headings: false,
	blockquote: false,
	ol: false,
	ul: false,
};

SlateEditor.propTypes = {
	defaultNode: PropTypes.string.isRequired,
	// Formats
	bold: PropTypes.bool,
	italic: PropTypes.bool,
	underline: PropTypes.bool,
	code: PropTypes.bool,
	h1: PropTypes.bool,
	h2: PropTypes.bool,
	h3: PropTypes.bool,
	h4: PropTypes.bool,
	h5: PropTypes.bool,
	h6: PropTypes.bool,
	headings: PropTypes.bool,
	blockquote: PropTypes.bool,
	ol: PropTypes.bool,
	ul: PropTypes.bool,
};

export default SlateEditor;
