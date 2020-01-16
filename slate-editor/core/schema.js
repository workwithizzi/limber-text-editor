import { Block } from "slate";

/**
 * The editor's schema.
 *
 * @type {Object}
 */

export default {
	document: {
		last: { type: "paragraph" },
		normalize: (editor, { code, node, child }) => {
			switch (code) {
			case "last_child_type_invalid": {
				const paragraph = Block.create("paragraph");
				return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
			}
			}
		},
	},
	blocks: {
		image: {
			isVoid: true,
		},
	},
};
