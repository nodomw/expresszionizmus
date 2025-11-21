import { createPool } from "mariadb";
import config from "./env.ts";

export default createPool(config.db);
