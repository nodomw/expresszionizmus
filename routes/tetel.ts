import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const model = z
  .object({
    pazon: z.number().nonnegative(),
    razon: z.number().nonnegative(),
    db: z.number().nonnegative(),
  })
  .refine((m) => m.db <= 1, {
    message: "nem lehet 1-nél kevesebb pizzát kiadni",
  });

route.get("/", (req, res) => {});
route.get("/:id", (req, res) => {});
route.post("/", (req, res) => {});
route.put("/", (req, res) => {});
route.delete("/", (req, res) => {});

export default route;
