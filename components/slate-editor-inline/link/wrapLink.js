import PropTypes from "prop-types";

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {String} href - A text/url received from "cmd + v" text transfer.
 */

function wrapLink(editor, href) {
	editor.wrapInline({
		type: "link",
		data: { href },
	});

	editor.moveToEnd();
}

wrapLink.propTypes = {
	editor: PropTypes.object.isRequired,
	href: PropTypes.string.isRequired,
};

export default wrapLink;
