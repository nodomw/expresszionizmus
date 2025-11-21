import express from "express";
import pool from "../pool.ts";
import * as z from "zod";

const route = express.Router();
const model = z.object({
  vnev: z.string().nonempty(),
  vcim: z.string().nonempty(),
});
route.get("/", (req, res) => {});
route.get("/:id", (req, res) => {});
route.post("/", (req, res) => {});
route.put("/", (req, res) => {});
route.delete("/", (req, res) => {});

export default route;
