import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import PropTypes from "prop-types";

import { initialValue, Toolbar } from "./core";

// Inline
import renderInline from "./inline";

// Link
import { onPasteLink, renderLinkDialogWindow } from "./inline/link";

// Mark
import { onKeyDown, renderMark } from "./marks";

// Block
import { renderBlock } from "./blocks";

// POST and GET url's
import { POST_URL, GET_URL } from "../env";

// DB interactions
import { save, get, put, remove } from "../db";

class SlateEditor extends React.Component {
	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			// Deserialize the initial editor value.
			value: Value.fromJSON(initialValue),
			isAppRendered: false,
			// to store detected X, Y mouse position offset
			cursorPosition: {
				x: null,
				y: null,
			},
			isDialog: false,
			editorFormats: {},
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	// Side - Effects
	componentDidMount() {
		this.setState({
			isAppRendered: true,
		});
		// Update the initial content to be pulled from Local Storage if it exists.
		const existingValue = JSON.parse(localStorage.getItem("CONTENT"));
		if (existingValue) {
			this.setState({
				value: Value.fromJSON(existingValue),
			});
		}
		document.addEventListener("mousedown", this.handleClickOutside);

		this.mapFormatsToState(this.props);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	mapFormatsToState(props) {
		// Set formats to state
		const formats = {};
		if (props.formats) {
			this.props.formats.map(item => {
				if (Object.prototype.hasOwnProperty.call(item, "textAlign")) {
					formats.textAlign = item.textAlign;
				} else {
					formats[item] = true;
				}
			});
			this.setState({
				editorFormats: formats,
			});
		}
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({
				isDialog: false,
			});
		}
	}

	// On change, save the new `value`.
	onChange = ({ value }) => {
		// Save the value to Local Storage.
		// Check to see if the document has changed before saving.
		if (value.document != this.state.value.document) {
			const content = JSON.stringify(value.toJSON());
			localStorage.setItem("CONTENT", content);
		}
		
		this.setState({ value });
	};

	// Store a reference to the `editor`.
	ref = editor => {
		this.editor = editor;
	};

	// Get the HTML of the Text Editor.
	createMarkup = () => {
		return { __html: this.editor.el.innerHTML };
	};

	render() {

		// Global Context Destructuring
		const { editor } = this;

		// State Destructuring
		const { isAppRendered, value, isDialog, cursorPosition } = this.state;

		// Props Destructuring
		const { formats } = this.props;

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
					{!formats ?
						<Toolbar
							ctx={this}
							value={value}
							formats={this.props}
						/>
						:
						<Toolbar
							ctx={this}
							value={value}
							formats={this.state.editorFormats}
						/>
					}
					<Editor
						spellCheck
						autoFocus
						placeholder="Enter some rich text..."
						ref={this.ref}
						value={this.state.value}
						onChange={this.onChange}
						onKeyDown={(event, editor, next) => onKeyDown(this.props, event, editor, next)}
						onPaste={(event, editor) => onPasteLink(event, editor, value)}
						renderBlock={(props, next) => renderBlock(props, next)}
						renderMark={(props, next) => renderMark(props, next)}
						renderInline={(props, next) => renderInline(this, props, next)}
						style={{ border: "1px solid grey", minHeight: "60px" }}
					/>
					{isDialog && renderLinkDialogWindow(this.setWrapperRef, editor, value, cursorPosition)}
				</div>
				<div style={{ textAlign: "center" }}>
					<button onClick={() => save(POST_URL, value)}>Save to DB</button>
					<button onClick={() => get(this, GET_URL)}>Load from DB</button> 
					<button onClick={() => put(POST_URL, value)}>Update to DB</button>
					<button onClick={() => remove(POST_URL)}>Delete from DB</button>
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
				{
					isAppRendered && (
						<>
							<p>HTML:</p>
							<div dangerouslySetInnerHTML={this.createMarkup()}></div>
						</>
					)
				}
			</>
		);
	}
}

SlateEditor.defaultProps = {
	defaultNode: "paragraph",
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
	textAlign: null,
	link: false,
	formats: null,
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
	textAlign: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string,
	]),
	link: PropTypes.bool,
	formats: PropTypes.array,
};

export default SlateEditor;
