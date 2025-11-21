import express from "express";
import * as z from "zod";

const app = express();

app.use(express.static("public"));
