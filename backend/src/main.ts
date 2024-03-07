import express from "express"
import pino from "pino"
import {closeDb, setupDB} from "./db";

let env = process.env.NODE_ENV || 'development';

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
        res.send("pong")
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
