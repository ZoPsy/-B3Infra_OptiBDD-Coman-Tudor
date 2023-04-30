// pages/api/movie/[id].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const idMovie = req.query.idMovie
    const client = await clientPromise;
    const db = client.db("sample_mflix");


    const FakeMovieToAdd = {
        "plot": "UN FILM tah LES FOUS",
        "genres": [
            "Thriller",
            "Amusant"
        ],
        "runtime": 88,
        "cast": [
            "JdG",
            "John weak",
            "Dartagnan"
        ],
        "num_mflix_comments": 1,
        "poster": "https://images7.alphacoders.com/857/thumb-1920-857882.jpg",
        "title": "Bim bam boum grrr",
        "lastupdated": "2015-09-15 02:07:14.247000000",
        "languages": [
            "Francais"
        ],
        "released": "1913-11-24T00:00:00.000Z",
        "directors": [
            "Moi",
            "Lui"
        ],
        "rated": "TV-PG",
        "awards": {
            "wins": 1,
            "nominations": 65,
            "text": "1 win."
        },
        "year": 2003,
        "imdb": {
            "rating": 9,
            "votes": 500,
            "id": 3471
        },
        "countries": [
            "France"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 4.5,
                "numReviews": 60,
                "meter": 78
            },
            "dvd": "2008-08-26T00:00:00.000Z",
            "lastUpdated": "2015-08-10T18:33:55.000Z"
        }
    }

    switch (req.method) {

        //ajouter
        case "POST":
            if (idMovie == "null") {
                const dbAddMovie = await db.collection("movies").insertOne(FakeMovieToAdd);
                res.json({ status: 200, data: { movie: dbAddMovie } });
            } else {
                res.json({ status: 404, data: "Page indisponible." });
            }
            break;

        //récupérer
        case "GET":
            const dbMovie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: { movie: dbMovie } });
            break;

        //modifier
        case "PUT":
            const dbEditMovie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
            const iAmActor = await db.collection("movies").findOne({ $and: [{ _id: new ObjectId(idMovie) }, { cast: { $in: ["Tudor C."] } }] });
            if (iAmActor == null) {
                const dbEditMovie = await db.collection("movies").updateOne({ _id: new ObjectId(idMovie) }, { $push: { cast: "Tudor C." } });
                res.json({ status: 200, data: { comment: dbEditMovie } });
            } else {
                res.json({ status: 403, data: "Tudor C. est déjà acteur" });
            }
            break;

        //supprimer
        case "DELETE":
            const dbDelMovie = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: { movie: dbDelMovie } });
            break;
    }

}