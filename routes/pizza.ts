import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const model = z
  .object({
    pnev: z.string().nonempty(),
    par: z.number().nonnegative(),
  })
  .refine((m) => m.par > 100, {
    message: "pizza árának 100Ft-nál nagyobbnak kell lennie",
  });

route.get("/", (req, res) => {});
route.get("/:id", (req, res) => {});
route.post("/", (req, res) => {});
route.put("/", (req, res) => {});
route.delete("/", (req, res) => {});

export default route;
