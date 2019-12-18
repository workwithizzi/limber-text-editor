// Endpoint: http://localhost:3000/api/content

import { MongoClient, ObjectId } from "mongodb";
import { MONGO_URL, DB_NAME, MONGO_OPTIONS, COLLECTION_NAME } from "../../env";

// POST data
async function postData(req, res) {
	const { content } = req.body;
	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		const contentBlock = await db.collection(COLLECTION_NAME).insertOne({ content });
		res.status(201).json(contentBlock.insertedId);
	} catch (error) {
		console.error(error);
	}
}

// UPDATE data
async function putData(req, res) {
	const { _id, content } = req.body;
	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		if (_id && content) {
			await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { content }});
			return res.status(204).json({});
		}
		res.status(400).json({ "error": "Wrong data." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ "error": "Something went wrong." });
	}
}

async function deleteData(req, res) {
	const { _id } = req.query;

	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		if (_id) {
			await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $unset: { content: ""}});
			const block = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(_id) });
			if (Object.keys(block).length === 1 && Object.keys(block)[0] === "_id") {
				await db.collection(COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(_id) });
			}
			return res.status(204).json({});
		}
		res.status(400).json({ "error": "Wrong data." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ "error": "Something went wrong." });
	}
}

async function getData(req, res) {
	const { _id } = req.query;
	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		if (_id) {
			const content = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(_id) });
			return res.status(200).json(content);
		}
		res.status(400).json({ "error": "Wrong data." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ "error": "Something went wrong." });
	}
}

export default async(req, res) => {
	switch (req.method) {
	case "POST":
		await postData(req, res);
		break;
	case "PUT":
		await putData(req, res);
		break;
	case "DELETE":
		await deleteData(req, res);
		break;
	case "GET":
		await getData(req, res);
		break;
	default:
		break;
	}
};
