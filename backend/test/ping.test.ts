import { expect, test } from "vitest";
import request, { Response } from "supertest";
import express from "express";
import ping from "../src/routes/ping";

test("test ping route", async () => {
  const app = express();
  app.use(express.json());
  app.use("/ping", ping);

  const response: Response = await request(app).get("/ping");
  expect(response.statusCode).equals(200);
});
