import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const model = z.object({
  fnev: z.string().nonempty().max(25),
  ftel: z.string().nonempty().max(15),
});

const id = z.number().nonnegative();

route.get("/", (req: express.Request, res: express.Response) => {
  let conn = pool
    .execute("select * from futar")
    .then((result) => res.status(200).json(result))
    .catch((e) => {
      res.status(500).send(e);
    });
});

route.get("/:id", (req: express.Request, res: express.Response) => {
  try {
    pool
      .execute("select * from futar where fazon = ?", [
        id.parse(Number(req.params.id)),
      ])
      .then((result) => res.status(200).json(result))
      .catch((e) => {
        res.status(404).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.post("/", (req, res) => {
  try {
    const futar = model.parse(req.body);

    pool
      .execute("insert into futar (fnev, ftel) values (?, ?)", [
        futar.fnev,
        futar.ftel,
      ])
      .then((r) => res.status(201).json(r));
  } catch (e) {
    res.status(500).send(e);
  }
});
route.put("/:id", (req, res) => {
  try {
    const futar = model.parse(req.body);

    pool
      .execute("update futar set fnev = ?, ftel = ? where fazon = ?", [
        futar.fnev,
        futar.ftel,
        id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => res.status(404).send(e));
  } catch (e) {
    res.status(500).send(e);
  }
});

route.delete("/:id", (req, res) => {
  try {
    pool
      .execute("delete from futar where fazon = ?", [
        id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => res.status(404).send(e));
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
