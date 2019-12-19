import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import PropTypes from "prop-types";

import { initialValue, schema, onPaste, Toolbar } from "./slate-editor-core";

// TextAlign
import { hasMultipleAligns, renderAlignButton, renderAlignButtons } from "./slate-editor-formats/text-align";

// Inline
import renderInline from "./slate-editor-inline";

// Link
import {
	renderLinkDialogWindow,
	renderLinkButton,
} from "./slate-editor-inline/link";

// Mark
import { onKeyDown, renderMarkButton, renderMark } from "./slate-editor-marks";

// Block
import { renderBlockButton, renderBlock, renderImageButton, onDropImage } from "./slate-editor-blocks";

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
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	// Side - Effects
	componentDidMount() {
		this.setState({
			isAppRendered: true,
		});
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
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
		const {
			textAlign,
			link,
			bold,
			italic,
			underline,
			code,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			headings,
			blockquote,
			ol,
			ul,
			img,
		} = this.props;

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
						{bold && renderMarkButton(editor, value, "bold", "format_bold")}

						{/* Italic */}
						{italic && renderMarkButton(editor, value, "italic", "format_italic")}

						{/* Underline */}
						{underline && renderMarkButton(editor, value, "underlined", "format_underlined")}

						{/* Code */}
						{code && renderMarkButton(editor, value, "code", "code")}

						{/* H1 */}
						{h1 && renderBlockButton(this, "heading-one", "looks_one")}

						{/* H2 */}
						{h2 && renderBlockButton(this, "heading-two", "looks_two")}

						{/* H3 */}
						{h3 && renderBlockButton(this, "heading-three", "looks_3")}
						
						{/* H4 */}
						{h4 && renderBlockButton(this, "heading-four", "looks_4")}

						{/* H5 */}
						{h5 && renderBlockButton(this, "heading-five", "looks_5")}

						{/* H6 */}
						{h6 && renderBlockButton(this, "heading-six", "looks_6")}

						{/* Headings*/}
						{headings && (
							<>
								{renderBlockButton(this, "heading-one", "looks_one")}
								{renderBlockButton(this, "heading-two", "looks_two")}
								{renderBlockButton(this, "heading-three", "looks_3")}
								{renderBlockButton(this, "heading-four", "looks_4")}
								{renderBlockButton(this, "heading-five", "looks_5")}
								{renderBlockButton(this, "heading-six", "looks_6")}
							</>
						)}

						{/* Text Align */}
						{textAlign &&
							(
								hasMultipleAligns(textAlign) ?
									renderAlignButtons(textAlign, value, editor) :
									renderAlignButton(textAlign, value, `format_align_${textAlign}`, editor)
							)
						}

						{/* Blockquote */}
						{blockquote && renderBlockButton(this, "block-quote", "format_quote")}

						{/* Ordered List */}
						{ol && renderBlockButton(this, "numbered-list", "format_list_numbered")}

						{/* Unordered List */}
						{ul && renderBlockButton(this, "bulleted-list", "format_list_bulleted")}

						{link && renderLinkButton(editor, value, "link")}

						{img && renderImageButton(this, "image", "image")}

					</Toolbar>
					<Editor
						spellCheck
						autoFocus
						placeholder="Enter some rich text..."
						ref={this.ref}
						schema={schema}
						value={this.state.value}
						onChange={this.onChange}
						onDrop={(event, editor, next) => onDropImage(event, editor, next)}
						onKeyDown={(event, editor, next) => onKeyDown(this.props, event, editor, next)}
						onPaste={(event, editor, next) => onPaste(event, editor, value, next)}
						renderBlock={(props, next) => renderBlock(this, props, next)}
						renderMark={(props, next) => renderMark(props, next)}
						renderInline={(props, next) => renderInline(this, props, next)}
						style={{ border: "1px solid grey", minHeight: "60px" }}
					/>
					{isDialog && renderLinkDialogWindow(this.setWrapperRef, editor, value, cursorPosition)}
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
	img: false,
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
	img: PropTypes.bool,
};

export default SlateEditor;
