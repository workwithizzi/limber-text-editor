import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import { isKeyHotkey } from "is-hotkey";

import { Button, Toolbar } from "./slatetools";

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

// Define the default node type.
const DEFAULT_NODE = "paragraph";

// Define hotkey matchers.
const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

// The rich text example.
class SlateEditor extends React.Component {
	// Deserialize the initial editor value.
	constructor() {
		super();
		this.state = {
			value: Value.fromJSON(initialValue),
			rendered: false,
		};
	}

	componentDidMount() {
		this.setState({
			rendered: true,
		});
	}

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

	createMarkup = () => {
		return { __html: this.editor.el.innerHTML };
	};

	// Render
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
						{this.renderMarkButton("bold", "format_bold")}
						{this.renderMarkButton("italic", "format_italic")}
						{this.renderMarkButton("underlined", "format_underlined")}
						{this.renderMarkButton("code", "code")}
						{this.renderBlockButton("heading-one", "looks_one")}
						{this.renderBlockButton("heading-two", "looks_two")}
						{this.renderBlockButton("block-quote", "format_quote")}
						{this.renderBlockButton("numbered-list", "format_list_numbered")}
						{this.renderBlockButton("bulleted-list", "format_list_bulleted")}
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

	// On change, save the new `value`.
	onChange = ({ value }) => {
		this.setState({ value });
	};

	// On key down, if it's a formatting command toggle a mark.
	onKeyDown = (event, editor, next) => {
		let mark;

		if (isBoldHotkey(event)) {
			mark = "bold";
		} else if (isItalicHotkey(event)) {
			mark = "italic";
		} else if (isUnderlinedHotkey(event)) {
			mark = "underlined";
		} else if (isCodeHotkey(event)) {
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
					.setBlocks(isActive ? DEFAULT_NODE : type)
					.unwrapBlock("bulleted-list")
					.unwrapBlock("numbered-list");
			} else {
				editor.setBlocks(isActive ? DEFAULT_NODE : type);
			}
		} else {
			// Handle the extra wrapping required for list buttons.
			const isList = this.hasBlock("list-item");
			const isType = value.blocks.some(block => {
				return !!document.getClosest(block.key, parent => parent.type === type);
			});

			if (isList && isType) {
				editor
					.setBlocks(DEFAULT_NODE)
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
}

export { SlateEditor };
