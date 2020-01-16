import { KeyUtils, Value } from "slate";

// Resets Slate's internal key generating function to its default state.
// See: https://github.com/ianstormtaylor/slate/blob/master/docs/reference/slate/utils.md
KeyUtils.resetGenerator();

// Create our initial value...
export default Value.fromJSON({
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
