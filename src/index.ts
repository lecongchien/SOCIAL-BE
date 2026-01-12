import express from "express";
import databateService from "./services/databate.services";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
databateService.connect();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
