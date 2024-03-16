import express from "express";
import { Tournament, TournamentInfo } from "../api-types";
import logger from "../logger.js";
import db from "../db.js";
import tournamentSchema from "../schemas/TournamentSchema.js";
import { v4 as uuid } from "uuid";
import { tournament_prefix } from "../consts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result: TournamentInfo[] = [];

  const collectionInfoCursor = db.listCollections();

  // Iterate over all collections and extract tournament information
  for await (const collection of collectionInfoCursor) {
    const info_doc = await db
      .collection(collection.name)
      .findOne({ type: "info" });

    if (info_doc != null) {
      const tournament_info: TournamentInfo = {
        name: info_doc.name,
        id: info_doc.id,
      };
      result.push(tournament_info);
      logger.debug(`GET /tournaments: ${JSON.stringify(tournament_info)}`);
    } else {
      // No info doc found
      logger.warn(`GET /tournaments: No info doc for ${collection.name}`);
    }
  }

  // Close cursor and send result
  await collectionInfoCursor.close();
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const validationResult = tournamentSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json(validationResult.error);
    return;
  }
  const tournament: Tournament = validationResult.value;

  const name = tournament.name;
  const values = tournament.values;
  const id = uuid();
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
    logger.warn(`POST /tournaments: No info doc created`);
  } else {
    res.status(201).send("The tournament has been created");
  }
});

router.get("/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const collection = db.collection(tournament_prefix + tournament_id);
  const info_doc = await collection.findOne({ type: "info" });
  if (info_doc == null) {
    res.status(404).send("The tournament with the specified id did not exist");
    return;
  }

  const result_tournament: Tournament = {
    name: info_doc.name,
    values: info_doc.values,
  };
  res.status(200).json(result_tournament);
});

router.put("/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const tournament: Tournament = req.body;
  const info_query = { type: "info" };
  const collection = db.collection(tournament_prefix + tournament_id);
  const info_doc = await collection.findOne(info_query);
  if (info_doc == null) {
    res.status(400).send("The request contained invalid content");
    return;
  } else {
    info_doc.name = tournament.name;
    info_doc.values = tournament.values;
    res.status(200).send("The tournament has been updated");
  }
});

router.delete("/:tournamentId", async (req, res) => {
  const tournament_id = req.params.tournamentId;
  const tournament_name = tournament_prefix + tournament_id;

  const collectionsCursor = db.listCollections();

  let collectionExists = false;
  for await (const collection of collectionsCursor) {
    if (collectionExists) break;
    if (collection.name === tournament_name) {
      collectionExists = true;
    }
  }

  logger.debug(
    `DELETE /tournaments/:tournamentId: ${JSON.stringify(tournament_name)}, Found: ${collectionExists}`,
  );

  if (collectionExists) {
    await db.dropCollection(tournament_name);
    res.status(200).send("The tournament has been updated");
    return;
  } else {
    res
      .status(404)
      .send("The tournament couldn't get deleted because it was not found");
  }
});

export default router;
