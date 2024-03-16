import express from "express";
import pino from "pino";
import { closeDb, setupDB } from "./db";
import { Tournament, TournamentInfo, TournamentValue } from "../../api/types";
import { Collection, UUID } from "mongodb";
import { v5 as uuid } from "uuid";

let env = process.env.NODE_ENV || "development";
let UUID_NAMESPACE = "tournaments";
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
    //returns array of tournament infos
    //tournament info is name and id
    var result: TournamentInfo[] = [];
    const collection_info_cursor = await db.listCollections();
    for await (const collection of collection_info_cursor) {
      const info_doc = await db
        .collection(collection.name)
        .findOne({ type: "info" });
      if (info_doc != null) {
        const tournament_info: TournamentInfo = {
          name: info_doc.name,
          id: info_doc.id,
        };
        result.push(tournament_info);
        logger.debug(
          "Get Tournaments - Name: " +
            tournament_info.name +
            " and ID: " +
            tournament_info.id,
        );
      } else {
        logger.warn(`Get Tournaments - No info doc for ${collection.name}`);
      }
    }
    res.status(200).send(result);
  });

  app.post("/tournaments", async (req, res) => {
    //create new tournament with name and values
    const tournament = req.body;
    const name = tournament.name;
    const values = tournament.values;
    const id = uuid(name, UUID_NAMESPACE);
    const info_doc = await db
      .collection(tournament_prefix + id.toString())
      .insertOne({
        type: "info",
        name: name,
        id: id,
        values: values,
      });
    if (info_doc == null) {
      res.status(400).send("The request contained invalid content");
      logger.warn(`Create Tournament - No info doc created`);
    } else {
      res.status(201).send("The tournament has been created");
    }
  });

  app.get("/tournaments/:tournamentId", async (req, res) => {
    //returns the given tournament from db
    const tournament_string = req.params.tournamentId;
    const info_query = { type: "info" };
    const collection = await db.collection(
      tournament_prefix + tournament_string,
    );
    const info_doc = await collection.findOne(info_query);
    var tournament_name, tournament_values;
    if (info_doc == null) {
      res
        .status(404)
        .send("The tournament with the specified id did not exist");
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

  app.put("/tournaments/:tournamentId", async (req, res) => {
    //update the given tournament in db
    const tournament_string = req.params.tournamentId;
    const tournament = req.body;
    const info_query = { type: "info" };
    const collection = await db.collection(
      tournament_prefix + tournament_string,
    );
    const info_doc = await collection.findOne(info_query);
    var tournament_name, tournament_values;
    if (info_doc == null) {
      res.status(400).send("The request contained invalid content");
      return;
    } else {
      info_doc.name = tournament.name;
      info_doc.values = tournament.values;
      res.status(200).send("The tournament has been updated");
    }
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
