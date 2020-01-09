import multer from "multer";

// Set the destination and filename for the image which will be saved
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/static");
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
	},
});

// Set "multer" options
const upload = multer({ storage });

async function uploadImageToFS(req, res) {
	upload.single("img")(req, {}, err => {
		if (err) {
			return res.status(500).json({
				type: "error",
				message: "There was a problem with saving the file. Please try again.",
			});
		}
		const img = req.file.filename;
		return res.status(200).send({ img });
	});
}

export default async(req, res) => {
	switch (req.method) {
	case "POST":
		await uploadImageToFS(req, res);
		break;
	default:
		res.status(405).json({});
	}
};

// disable default body parser to be able to accept and process files/images
export const config = {
	api: {
		bodyParser: false,
	},
};
