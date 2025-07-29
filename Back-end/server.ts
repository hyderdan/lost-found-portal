import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { CONNECT } from "./config/config";
const app = express();
const PORT = 3000;
const startServr = async () => {
    try {
        await CONNECT();
        app.use(cors(
            {
                origin: "http://localhost:5173",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
                optionsSuccessStatus: 204,
                allowedHeaders: ["Content-Type", "Authorization"],
            }
        ));
        app.use(bodyParser.json());
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServr();

// hello