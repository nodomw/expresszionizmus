import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const id = z.number().nonnegative();
const model = z
  .object({
    pazon: z.number().nonnegative().optional(),
    razon: z.number().nonnegative().optional(),
    db: z.number().nonnegative(),
  })
  .refine((m) => m.db >= 1, {
    message: "nem lehet 1-nél kevesebb pizzát kiadni",
  });

route.get("/", (req, res) => {
  try {
    pool
      .execute("select * from tetel")
      .then((result) => res.status(200).json(result))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.get("/:id", (req, res) => {
  try {
    pool
      .execute("select * from tetel where razon = ?", [Number(req.params.id)])
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
    const tetel = model.parse(req.body);

    pool
      .execute("insert into tetel (pazon, razon, db) values (?, ?, ?)", [
        tetel.pazon,
        tetel.razon,
        tetel.db,
      ])
      .then((r) => res.status(201).json(r))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.put("/:razon/:pazon", (req, res) => {
  try {
    const tetel = model.parse({
      pazon: Number(req.params.pazon),
      razon: Number(req.params.razon),
      ...req.body,
    });

    pool
      .execute("update tetel set  db = ? where razon = ? and pazon = ?", [
        tetel.db,
        tetel.razon,
        tetel.pazon,
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.delete("/:razon/:pazon", (req, res) => {
  try {
    pool
      .execute("delete from tetel where razon = ? and pazon = ?", [
        id.parse(Number(req.params.razon)),
        id.parse(Number(req.params.pazon)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => {
        res.status(404).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
