import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { CONNECT } from "./config/config";
import { initUserRoute } from "./route/userRoute"
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const startServr = async () => {
    try {
        await CONNECT();
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 
        app.use(cors(
            {
                origin: "http://localhost:5173",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
                optionsSuccessStatus: 204,
                allowedHeaders: ["Content-Type", "Authorization"],
            }
        ));
        app.use("/register", initUserRoute());
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServr();

// hello