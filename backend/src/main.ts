import express from "express";
import pino from "pino";
import { closeDb, setupDB } from "./db";
import { Tournament, TournamentInfo, TournamentValue } from "../../api/types";
import { Collection } from "mongodb";

let env = process.env.NODE_ENV || "development";

let tournament_prefix = "tour_";

let level;
if (env == "production") {
  level = "info";
} else {
  level = "debug";
}
const logger = pino({
  level: level,
});

async function main() {
  const db = await setupDB(logger);

  const app = express();
  app.use(express.json());

  app.get("/ping", (req, res) => {
    logger.debug(`Received ping from ${req.hostname}`);
    res.send("Pong");
  });

  app.post("/auth", (req, res) => {
    logger.debug(`Received auth request from ${req.hostname}`);
    const body: { password: string } = req.body;
    if (!body.password) {
      logger.debug("Auth request didn't contain password");
      res
        .status(400)
        .json({ errorMessage: "Password is missing from request" });
      return;
    }

    if (body.password === "abc") {
      logger.debug("Auth request contained correct password");
      res.status(200).json({ valid: true });
      return;
    }

    logger.debug("Auth request contained invalid password");
    res.status(401).json({ errorMessage: "Password is invalid" });
  });

  app.get("/tournaments", async (req, res) => {
    var result: TournamentInfo[] = [];
    /*db.
        db.getCollectionNames().forEach((col_name) => {
            var info_doc = db[col_name].find({tpye: "info"})
            const info: TournamentInfo = {
            id: "da",
            name: "ad"
            }
        result.push(info)    
        } 
       
         
        
        await cursor.close()*/
    res.status(200).send(result);
  });

  app.get("/tournaments/:tournamentId", async (req, res) => {
    const tournament_string = req.params.tournamentId;
    const info_query = { type: "info" };
    const collection = await db.collection(
      tournament_prefix + tournament_string,
    );
    const info_doc = await collection.findOne(info_query);
    var tournament_name, tournament_values;
    if (info_doc == null) {
      res.status(404).send("No tournament with given id");
      return;
    } else {
      tournament_name = info_doc.name;
      tournament_values = info_doc.values;
    }

    const result_tournament: Tournament = {
      name: tournament_name,
      values: tournament_values,
    };
    res.status(200).send(result_tournament);
  });

  const server = app.listen(8080, () => {
    logger.info("Started");
  });

  process.on("SIGINT", () => {
    logger.info("Stopping (SIGINT)");
    server.close();
    closeDb(logger);
  });
  process.on("SIGTERM", () => {
    logger.info("Stopping (SIGTERM)");
    server.close();
    closeDb(logger);
  });
}

main().catch((err) => logger.error(err, "An error occurred during execution"));
