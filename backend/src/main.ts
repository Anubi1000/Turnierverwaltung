import express from "express"
import pino from "pino"
import {closeDb, setupDB} from "./db";

let env = process.env.NODE_ENV || 'development';

let tournament_prefix = "tour_"

let level;
if (env == "production") {
    level = "info"
} else {
    level = "debug"
}
const logger = pino({
    level: level
})

async function main() {
    const db = await setupDB(logger)

    const app = express()
    app.use(express.json())

    app.get("/ping", (req, res) => {
        logger.debug(`Received ping from ${req.hostname}`)
        res.send("Pong")
    })

    app.post("/auth", (req, res) => {
        logger.debug(`Received auth request from ${req.hostname}`)
        const body: { password: string } = req.body
        if (!body.password) {
            logger.debug("Auth request didn't contain password")
            res.status(400).json({errorMessage: "Password is missing from request"})
            return
        }

        if (body.password === "abc") {
            logger.debug("Auth request contained correct password")
            res.status(200).json({valid: true})
            return
        }

        logger.debug("Auth request contained invalid password")
        res.status(401).json({errorMessage: "Password is invalid"})
    })

    app.get("/tournaments", async (req, res) => {
        const cursor = db.collection("tournaments").find().project({name: 1})
        const values = await cursor.toArray()
        cursor.close()
        if (values.length == 0) {
            res.status(404).send("No tournaments")
        } else {
            res.status(200).send(values)
        }
    })

    app.get("/tournaments/:tournamentId", async (req, res) => {
        const tournament_string = req.params.tournamentId
        const result = db.collection(tournament_prefix+ tournament_string)
        if (!result) {
            res.status(404).send("No tournaments")
        } else {
            res.status(200).send(result)
        }
    })


    const server = app.listen(8080, () => {
        logger.info("Started")
    })

    process.on("SIGINT", () => {
        logger.info("Stopping (SIGINT)")
        server.close()
        closeDb(logger)
    })
    process.on("SIGTERM", () => {
        logger.info("Stopping (SIGTERM)")
        server.close()
        closeDb(logger)
    })
}

main().catch(err => logger.error(err, "An error occurred during execution"))
