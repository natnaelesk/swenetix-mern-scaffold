import FeedsModels from "../models/Feeds.models.js";

const createPost = async (req,res) => {
    const { title, imageUrl } = req.body;
    const newPost = new FeedsModels({ title, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
}

export default createPost;