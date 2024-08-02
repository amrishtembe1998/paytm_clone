const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
