import axios from "axios";

async function saveImageToFS(img) {
	const data = new FormData();
	data.append("img", img);
	const response = await axios.post(process.env.POST_IMAGE_UPLOAD, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.img;
}

export default saveImageToFS;
