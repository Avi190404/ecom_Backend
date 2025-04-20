import express, { Request, Response } from 'express';
import connectToDb from './config/connectToDB';
import dotenv from 'dotenv'
import allRoutes from "./routes/allRoutes"

const app = express();
dotenv.config({ path: ".env.local" });
app.use(express.json());
app.use("/api",allRoutes)

const PORT = process.env.PORT || 3001;
connectToDb();

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});