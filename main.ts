import express from "express";
import config from "./env.ts";
import * as model from "./models.ts";
import { default as futar } from "./routes/futar.ts";
import { default as pizza } from "./routes/pizza.ts";
import { default as tetel } from "./routes/tetel.ts";
import { default as rendeles } from "./routes/rendeles.ts";
import { default as vevo } from "./routes/vevo.ts";

(BigInt.prototype as { toJSON?: () => string }).toJSON = function () {
  return this.toString();
};

const app = express();

app.use("/public", express.static("public"));
app.use(express.json());

app.use(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.method, req.path, req.body);
    next();
  },
);

app.use("/futar", futar);
app.use("/pizza", pizza);
app.use("/tetel", tetel);
app.use("/rendeles", rendeles);
app.use("/vevo", vevo);

app.post("/ujrendeles", async (req, res) => {
  try {
    const orderData = model.order.parse(req.body);

    // POST /rendeles
    const rendeles = await fetch(
      "http://localhost:" + config.server.port + "/rendeles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData.rendeles),
      },
    );

    // POST /tetel
    const tetel = await fetch(
      "http://localhost:" + config.server.port + "/tetel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData.tetel),
      },
    );
    // response
    Promise.all([rendeles, tetel])
      .then((results) => {
        res.status(201).json({
          rendeles: results[0],
          tetel: results[1],
        });
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(config.server.port, (err) => {
  console.log(`listening on port ${config.server.port}`);
});
