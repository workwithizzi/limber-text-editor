// Endpoint: localhost:7777/api/content

import { MongoClient, ObjectId } from "mongodb";
import { MONGO_URL, DB_NAME } from "env";

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const COLLECTION_NAME = "data-content";

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
	const { _id, name, location } = req.body;
	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		if (name) {
			const block = await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { name }});
			return res.status(200).json(block.value._id);
		}
		if (location) {
			const block = await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { location }});
			return res.status(200).json(block.value._id);
		}
	} catch (error) {
		console.error(error);
	}
}

async function deleteData(req, res) {
	const { name, location, _id } = req.query;

	try {
		// Establish connection with DB
		const client = await MongoClient.connect(MONGO_URL, MONGO_OPTIONS);
		const db = client.db(DB_NAME);
		// Establish connection with the collection
		if (name) {
			await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $unset: { name: ""}});
			const block = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(_id) });
			if (Object.keys(block).length === 1 && Object.keys(block)[0] === "_id") {
				await db.collection(COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(_id) });
			}
			return res.status(200).json({});
		}
		if (location) {
			await db.collection(COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(_id) }, { $unset: { location: ""}});
			const block = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(_id) });
			if (Object.keys(block).length === 1 && Object.keys(block)[0] === "_id") {
				await db.collection(COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(_id) });
			}
			return res.status(200).json({});
		}
	} catch (error) {
		console.error(error);
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
	default:
		break;
	}
};
