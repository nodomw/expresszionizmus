import express from "express";
import pool from "../pool.ts";
import * as model from "../models.ts";

const route = express.Router();
route.get("/", (req, res) => {
  try {
    pool
      .execute("select * from vevo")
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
      .execute("select * from vevo where vazon = ?", [
        model.id.parse(Number(req.params.id)),
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
    const vevo = model.vevo.parse(req.body);

    pool
      .execute("insert into vevo (vnev, vcim) values (?, ?)", [
        vevo.vnev,
        vevo.vcim,
      ])
      .then((r) => res.status(201).json(r));
  } catch (e) {
    res.status(500).send(e);
  }
});
route.put("/:id", (req, res) => {
  try {
    const vevo = model.vevo.parse(req.body);

    pool
      .execute("update vevo set vnev = ?, vcim = ? where vazon = ?", [
        vevo.vnev,
        vevo.vcim,
        model.id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r));
  } catch (e) {
    res.status(500).send(e);
  }
});
route.delete("/:id", (req, res) => {
  try {
    pool
      .execute("delete from vevo where vazon = ?", [
        model.id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r));
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
