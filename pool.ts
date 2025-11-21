import { createPool } from "mariadb/*";
import config from "./env";

export default createPool(config.db);
