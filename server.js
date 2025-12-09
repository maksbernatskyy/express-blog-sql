const express = require("express");
const app = express();
const PORT = 3000;
const postsRouter = require("./routers/posts");
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

// Access to folder public
app.use(express.static("public"));

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
});

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

// Use posts router
app.use("/posts", postsRouter);

// View in console the port
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});

app.use(errorsHandler);

app.use(notFound);