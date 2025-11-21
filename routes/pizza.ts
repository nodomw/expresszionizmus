import express from "express";
import pool from "../pool.ts";
import * as model from "../models.ts";

const route = express.Router();

route.get("/", (req, res) => {
  try {
    pool
      .execute("select * from pizza")
      .then((r) => res.status(200).json(r))
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
      .execute("select * from pizza where pazon = ?", [
        model.id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => {
        res.status(404).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.post("/", (req, res) => {
  console.log(req.body);
  try {
    const pizza = model.pizza.parse(req.body);

    pool
      .execute("insert into pizza (pnev, par) values (?, ?)", [
        pizza.pnev,
        pizza.par,
      ])
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
    const pizza = model.pizza.parse(req.body);

    pool
      .execute("update pizza set pnev = ?, par = ? where pazon = ?", [
        pizza.pnev,
        pizza.par,
        model.id.parse(Number(req.params.id)),
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
      .execute("delete from pizza where pazon = ?", [
        model.id.parse(Number(req.params.id)),
      ])
      .then((r) => res.status(200).json(r))
      .catch((e) => res.status(404).send(e));
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
