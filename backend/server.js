import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/FoodRoute.js"

// 🔥 load env variables
dotenv.config()

//config
const app = express()
const port = process.env.PORT || 4000   // ✅ use env

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})