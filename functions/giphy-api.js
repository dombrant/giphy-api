import serverless from "serverless-http";
import app from "../index.js";

exports.handler = serverless(app);
