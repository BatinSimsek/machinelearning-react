import {MongoClient, Document, Collection} from "mongodb";

export async function getCollection<T extends Document> (
    dbName: string,
    collection: string,
):Promise<Collection<T>> {
    const client = await MongoClient.connect(process.env.MONGODB_URI ?? '')
    return client.db(dbName)
        .collection<T>(collection)
}
