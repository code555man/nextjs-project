import clientPromise from "../../lib/mongodb";

export default async function (req, res) {

    try {
        const client = await clientPromise
        const db = client.db("posts")
        const { title, content } = req.body
        const post = await db
            .collection("posts")
            .insertOne({ title: req.body.title, content: req.body.content })

        res.json(post)
    } catch (e) {
        console.error(e);
        throw new Error(e).message
    }
}