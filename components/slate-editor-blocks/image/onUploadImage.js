import uploadImage from "./uploadImage";
import insertImage from "./insertImage";

async function onUploadImage(ctx) {
	const { files } = event.target;
	const { editor } = ctx;

	const target = editor.findEventRange(event);

	try {
		const result = await uploadImage(files);
		editor.command(insertImage, result, target);
	} catch(error) {
		console.log(error);
	}
}

export default onUploadImage;
