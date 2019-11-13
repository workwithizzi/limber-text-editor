import React from "react";
import Head from "next/head";
import { SlateEditor } from "../components/SlateEditor";

function Home() {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
			</Head>

			<SlateEditor />
		</>
	);
}

export default Home;
