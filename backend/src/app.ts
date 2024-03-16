import express from "express";
import ping from "./routes/ping.js";
import auth from "./routes/auth.js";
import tournaments from "./routes/tournaments.js";

const app = express();
app.use(express.json());

app.use("/ping", ping);
app.use("/auth", auth);
app.use("/tournaments", tournaments);

export default app;
