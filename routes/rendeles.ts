import express from "express";
import pool from "../pool";
import * as z from "zod";

const route = express.Router();

route.get("/:id", (req, res) => {});
route.post("/", (req, res) => {});
route.put("/", (req, res) => {});
route.delete("/", (req, res) => {});

export default route;
