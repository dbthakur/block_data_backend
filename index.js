// import express from "express";
// import 'dotenv/config';

// import cors from 'cors';

// import bodyParser from "body-parser";

// import { dbConnect } from "./db/dbConnect.js";
// import routes from "./routes/routes.js";

// import { errorHandler } from "./utils/errorHandler.js";

// const app = express();

// app.use(cors())


// app.use(bodyParser.json());

// const PORT = 5105;

// app.use('/', routes)
// app.use(errorHandler);

// dbConnect();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import 'dotenv/config';
import cors from 'cors';
import bodyParser from "body-parser";
import fs from 'fs';
import https from 'https';
import { dbConnect } from "./db/dbConnect.js";
import routes from "./routes/routes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.use(errorHandler);

dbConnect();

const isProduction = process.env.ENV === "production";

if (isProduction) {
  const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/railsetu.in/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/railsetu.in/fullchain.pem'),
  };

  https.createServer(sslOptions, app).listen(5105, () => {
    console.log("✅ HTTPS server running on port 5105");
  });
} else {
  const PORT = process.env.PORT || 5105;
  app.listen(PORT, () => {
    console.log(`Dev server running on http://localhost:${PORT}`);
  });
}
