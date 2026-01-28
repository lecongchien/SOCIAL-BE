import express from "express";
import databateService from "./services/databate.services";
import userRouter from "./routes/users.routes";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
databateService.connect();

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log(err);
    res.status(404).json({ message: "Internal server error" });
  },
);
// Mount user routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
