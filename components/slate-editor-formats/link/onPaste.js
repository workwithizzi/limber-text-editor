import { getEventTransfer } from "slate-react";
import isUrl from "is-url";
import PropTypes from "prop-types";

import hasLinks from "./hasLinks";
import unwrapLink from "./unwrapLink";

const onPaste = (event, editor, value, next) => {
	if (editor.value.selection.isCollapsed) return next();

	const transfer = getEventTransfer(event);
	const { type, text } = transfer;
	if (type !== "text" && type !== "html") return next();
	if (!isUrl(text)) return next();

	if (hasLinks(value)) {
		unwrapLink(editor);
	}

	this.wrapLink(editor, text);
};

onPaste.propTypes = {

};

export default onPaste;
