const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`unhandled Rejection: ${error} \n ErrorStack: ${error.stack}`);
});

process.on("uncaughtException", (error, promise) => {
  console.log(`uncaught Exception: ${error} \n ErrorStack: ${error.stack}`);
});
