// pages/api/comment/[idComment].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const idComment = req.query.idComment
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const fakecomm={
        "name": "Timothé",
        "email": "timothé@fakeyahoo.com",
        "movie_id": "644e67b6c2c83ec35834fcd7",
        "text": "Super commenteur a vu ce film",
        "date": "2022-10-21T05:54:02.000Z",
        "title": "Commentaire de Timothé mgl !"
    }

    switch (req.method) {
        
        case "POST":
            if (idComment == "null") {
                const dbAddComment = await db.collection("comments").insertOne(fakecomm);
                res.json({ status: 200, data: { comment: dbAddComment} });
            } else {
                res.json({ status: 404, data: "Page indisponible." });
            }
        break;

        case "GET":
            const dbComments = await db.collection("comments").findOne({ _id : new ObjectId(idComment) });
            res.json({status: 200, data: {dbComments} });
        break;

        case "PUT":
            const commenthavetitle = await db.collection("comments").findOne({_id : new ObjectId(idComment), title: { $exists: true } }); 
            if(!commenthavetitle){
                const dbEditComments = await db.collection("comments").updateOne({ _id : new ObjectId(idComment) }, { $set: { title: "Titre de commentaire" } }); 
                res.json({ status: 200, data: {comment: dbEditComments } });
            } else {
                res.json({ status: 400, data: "Ce commentaire a déjà un titre" });
            }
        break;

        case "DELETE":
            const dbDelComments = await db.collection("comments").deleteOne({ _id : new ObjectId(idComment) })
            res.json({ status: 200, data: { comment: dbDelComments } });
        break;

    }

}