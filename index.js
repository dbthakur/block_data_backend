import express from "express";
import 'dotenv/config';

import cors from 'cors';

import bodyParser from "body-parser";

import { dbConnect } from "./db/dbConnect.js";
import routes from "./routes/routes.js";

import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors())

// app.use(cors({
//   origin: ['https://railsetu.in'] // origin: '*'
// }))

app.use(bodyParser.json());

const PORT = 5050;

app.use('/', routes)
app.use(errorHandler);

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
