import React from "react";
import Head from "next/head";
import SlateEditor from "../slate-editor/SlateEditor";

const EDITOR_FORMATS = [
	"bold",
	"italic",
	"underline",
	"code",
	"headings",
	"blockquote",
	"ol",
	"ul",
	{ textAlign: ["left", "center", "right"] },
	"link",
	"img",
];

function Home() {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
			</Head>

			{/*
				defaultNode: string that represents the default node type for the editor. If not set, the default will be set to <p>.
				bold: boolean that defines whether Bold format support should be added.
				italic: boolean that defines whether Italic format support should be added.
				underline: boolean that defines whether Underline format support should be added.
				code: boolean that defines whether Code format support should be added.

				{
					h1: boolean that defines whether H1 format support should be added.
					h2: boolean that defines whether H2 format support should be added.
					h3: boolean that defines whether H3 format support should be added.
					h4: boolean that defines whether H4 format support should be added.
					h5: boolean that defines whether H5 format support should be added.
					h6: boolean that defines whether H6 format support should be added.
				}
					alternatively if there's a need to pass all the headings from h1 to h6, for simplicity reasons, pass "headings" prop
				{
					headings: boolean that defines that all H1-H6 formats should be added.
				}

				blockquote: boolean that defines whether Blockquote format support should be added.
				ol: boolean that defines whether Ordered List format should be added.
				ul: boolean that defines whether Unordered List format should be added.
				textAlign: array of options ["left", "center", "right"] || single string: "left", "right", "center", that defines whether text-align format should be added.
				link: boolean that defines whether Link format support should be added.

				The props may be passed separately, like so:

				<SlateEditor
					bold
					italic
					underline
					code
					headings
					blockquote
					ol
					ul
					textAlign={["left", "center", "right" ]}
					link
				/>

				or as an array of props:

				<SlateEditor formats={EDITOR_FORMATS} />

			*/}

			<SlateEditor formats={EDITOR_FORMATS} />
		</>
	);
}

export default Home;
