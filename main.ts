import express from "express";
import * as z from "zod";
import config from "./env";
import { default as futar } from "./routes/futar";
import { default as pizza } from "./routes/pizza";
import { default as tetel } from "./routes/tetel";
import { default as rendeles } from "./routes/rendeles";
import { default as vevo } from "./routes/vevo";

const app = express();

app.use(express.static("public"));

app.use("/futar", futar);
app.use("/pizza", pizza);
app.use("/tetel", tetel);
app.use("/rendeles", rendeles);
app.use("/vevo", vevo);

app.listen(config.server.port, (err) => {
  console.log(`listening on port ${config.server.port}`);
});
