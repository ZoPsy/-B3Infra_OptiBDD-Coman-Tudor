// pages/api/movies.js
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {

    switch (req.method) {

        case "POST":
            res.json({ status: 404, data: "Page indisponible." });
        break;

        case "GET":
            const client = await clientPromise;
            const db = client.db("sample_mflix");
            const movies = await db.collection("movies").find({}).limit(10).toArray();
            res.json({ status: 200, data: movies });
        break;

    }

}