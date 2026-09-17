import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import FeedsRoutes from "./routes/Feeds.routes.js"

dotenv.config() 
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        console.log("Connected to MongoDB!!")
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)

    })


app.use("/api/feeds" ,   FeedsRoutes )



