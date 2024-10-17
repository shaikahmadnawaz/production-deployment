import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Node.js API",
  });
});

const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

export { app, server };
