import express from "express";
import examples from "./routers/examples"
import { initializeDataSource } from "./app-data-source"

const app = express();
const PORT = process.env.PORT || 3000;

initializeDataSource();

app.use(express.json());

app.use('/', examples);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});