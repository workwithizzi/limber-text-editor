import React from "react";
import { cx, css } from "emotion";
import PropTypes from "prop-types";

import { renderMarkButton } from "../marks";
import { renderBlockButton } from "../blocks";
import { hasMultipleAligns, renderAlignButton, renderAlignButtons } from "../formats/text-align";
import { renderLinkButton } from "../inline/link";

/**
 * Editor Toolbar
 *
 * @param {String} className - CSS class.
 * @param {Object} ctx - The global context object, e.g. "this".
 * @param {Object} value - The editor's value from state.
 * @param {Object} formats - The formats for the Editor.
 *
 * @returns {element} Toolbar.
 */
function Toolbar({ className, ctx, value, formats }) {

	const { editor } = ctx;

	const {
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
		textAlign,
		blockquote,
		ol,
		ul,
		link,
	} = formats;

	return (
		<div
			className={cx(
				className,
				css`
				& > * {
					display: inline-block;
				}

				& > * + * {
					margin-left: 15px;
				}
			`,
				css`
				position: relative;
				padding: 1px 18px 17px;
				margin: 0 -20px;
				border-bottom: 2px solid #eee;
				margin-bottom: 20px;
			`
			)}
		>
			{/* Bold */}
			{bold && renderMarkButton(editor, value, "bold", "format_bold")}

			{/* Italic */}
			{italic && renderMarkButton(editor, value, "italic", "format_italic")}

			{/* Underline */}
			{underline && renderMarkButton(editor, value, "underlined", "format_underlined")}

			{/* Code */}
			{code && renderMarkButton(editor, value, "code", "code")}

			{/* H1 */}
			{h1 && renderBlockButton(ctx, "heading-one", "looks_one")}

			{/* H2 */}
			{h2 && renderBlockButton(ctx, "heading-two", "looks_two")}

			{/* H3 */}
			{h3 && renderBlockButton(ctx, "heading-three", "looks_3")}

			{/* H4 */}
			{h4 && renderBlockButton(ctx, "heading-four", "looks_4")}

			{/* H5 */}
			{h5 && renderBlockButton(ctx, "heading-five", "looks_5")}

			{/* H6 */}
			{h6 && renderBlockButton(ctx, "heading-six", "looks_6")}

			{/* Headings */}
			{headings && (
				<>
					{renderBlockButton(ctx, "heading-one", "looks_one")}
					{renderBlockButton(ctx, "heading-two", "looks_two")}
					{renderBlockButton(ctx, "heading-three", "looks_3")}
					{renderBlockButton(ctx, "heading-four", "looks_4")}
					{renderBlockButton(ctx, "heading-five", "looks_5")}
					{renderBlockButton(ctx, "heading-six", "looks_6")}
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
			{blockquote && renderBlockButton(ctx, "block-quote", "format_quote")}

			{/* Ordered List */}
			{ol && renderBlockButton(ctx, "numbered-list", "format_list_numbered")}

			{/* Unordered List */}
			{ul && renderBlockButton(ctx, "bulleted-list", "format_list_bulleted")}

			{link && renderLinkButton(editor, value, "link")}

		</div>
	);
}

Toolbar.propTypes = {
	ctx: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
	formats: PropTypes.object.isRequired,
};

export default Toolbar;
