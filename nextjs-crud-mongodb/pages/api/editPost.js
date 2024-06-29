import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
    try {
        const client = await clientPromise
        const db = client.db("posts")
        const { id, title, content } = req.body
        const post = await db
            .collection("posts")
            .updateOne({ _id: new ObjectId(id) }, { $set: { title, content } })
        res.json(post)
    } catch (e) {
        console.error(e);
        throw new Error(e).message
    }
}