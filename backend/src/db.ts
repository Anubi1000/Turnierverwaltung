import {MongoClient} from "mongodb";
import {Logger} from "pino";

let client: MongoClient;

export async function setupDB(logger: Logger) {
    client = new MongoClient(process.env["MONGO_DB_URL"] || "", {
        auth: {
            username: process.env["MONGO_DB_USER"] || "",
            password: process.env["MONGO_DB_PASSWORD"] || ""
        }
    })

    try {
        logger.info("Trying connection to MongoDB")
        await client.connect()
        logger.info("Connected to MongoDB");

        return client.db("turnierverwaltung");
    } catch (err) {
        logger.error(err, "Failed to connect to MongoDB");
        throw err
    }
}

export async function closeDb(logger: Logger) {
    logger.info("Trying to close connection to MongoDB")
    await client.close()
    logger.info("Closed to MongoDB");
}