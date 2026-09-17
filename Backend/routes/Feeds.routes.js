import { Router } from "express";
import createPost  from "../controllers/Feeds.controllers.js";


const FeedsRoutes = Router();


FeedsRoutes.get('/' , (req,res) => {
        res.send('Feeds Routes');
    });

FeedsRoutes.post("/", createPost)

export default FeedsRoutes;