import express from "express";
import config from "./env.ts";
import { default as futar } from "./routes/futar.ts";
import { default as pizza } from "./routes/pizza.ts";
import { default as tetel } from "./routes/tetel.ts";
import { default as rendeles } from "./routes/rendeles.ts";
import { default as vevo } from "./routes/vevo.ts";

(BigInt.prototype as { toJSON?: () => string }).toJSON = function () {
  return this.toString();
};

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.method, req.path);
    console.log(req.body);
    next();
  },
);

app.use("/futar", futar);
app.use("/pizza", pizza);
app.use("/tetel", tetel);
app.use("/rendeles", rendeles);
app.use("/vevo", vevo);

app.listen(config.server.port, (err) => {
  console.log(`listening on port ${config.server.port}`);
});
