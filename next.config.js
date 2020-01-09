const env = require("./env");

module.exports = {
	env: {
		MONGO_URL: env.MONGO_URL,
		DB_NAME: env.DB_NAME,
		POST_URL: env.POST_URL,
		GET_URL: env.GET_URL,
		MONGO_OPTIONS: env.MONGO_OPTIONS,
		COLLECTION_NAME: env.COLLECTION_NAME,
		POST_IMAGE_UPLOAD: env.POST_IMAGE_UPLOAD,
	},
};
