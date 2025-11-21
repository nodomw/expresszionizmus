import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const id = z.number().nonnegative();
const model = z.object({
  vazon: z.number().nonnegative(),
  fazon: z.number().nonnegative(),
  idopont: z.string().nonempty(),
});

route.get("/", (req, res) => {
  try {
    pool
      .execute("select * from rendeles")
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
      .execute("select * from rendeles where razon = ?", [
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
    const rendeles = model.parse(req.body);

    pool
      .execute(
        "insert into rendeles (vazon, fazon, idopont) values (?, ?, ?)",
        [rendeles.vazon, rendeles.fazon, rendeles.idopont],
      )
      .then((r) => res.status(201).json(r))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

route.put("/:id", (req, res) => {
  try {
    const rendeles = model.parse(req.body);

    pool
      .execute(
        "update rendeles set vazon = ?, fazon = ?, idopont = ? where razon = ?",
        [
          rendeles.vazon,
          rendeles.fazon,
          rendeles.idopont,
          id.parse(Number(req.params.id)),
        ],
      )
      .then((r) => res.status(200).json(r))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

route.delete("/:id", (req, res) => {
  try {
    pool
      .execute("delete from rendeles where razon = ?", [
        id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => {
        res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
