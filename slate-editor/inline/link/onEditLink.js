import PropTypes from "prop-types";

import hasLinks from "./hasLinks";

/**
 * Edit link href.
 *
 * @param {Editor} editor - A global editor reference, e.g. "this.editor".
 * @param {State} value - An editor's value/state.
 */

function onEditLink(editor, value) {
	let currentHref = "";

	if (hasLinks(value)) {
		value.inlines.some(inline => {
			currentHref = inline.data.get("href");
		});

		const href = window.prompt("Enter the URL of the link:", currentHref);

		editor
			.setInlines({
				type: "link",
				data: { href },
			});
	}
}

onEditLink.propTypes = {
	editor: PropTypes.object.isRequired,
	value: PropTypes.object.isRequired,
};

export default onEditLink;
