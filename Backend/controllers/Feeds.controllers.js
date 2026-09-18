import FeedsModels from "../models/Feeds.models.js";

export const createPost = async (req,res) => {

    
    try {
        const { title, imageUrl , userId } = req.body;
        if (userId !== req.user.id) {
            return res.status(401).json({ message: "You are not authorized to create this post" });
        }
        if (!title || !imageUrl) {
            return res.status(400).json({ message: "Title and imageUrl are required" });
        }
        const newPost = new FeedsModels({ title, imageUrl, userId: req.user.id });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't create post", error: error.message });
    }
}

export const getPosts = async (req,res) => {
    const posts = await FeedsModels.find({}).sort({ createdAt: -1 }).populate('userId', 'username');
    res.status(200).json({ message: "Posts fetched successfully", posts: posts });
}


export const deletePost = async (req,res) => {

    const { id } = req.params;
    const post = await FeedsModels.findByIdAndDelete(id);
    res.status(200).json(post);
}

export const updatePost = async (req,res) => {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const post = await FeedsModels.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
    res.status(200).json(post);
}

export const likePost = async (req,res) => {
    const { id } = req.params;
    const post = await FeedsModels.findById(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    
    post.likes++;
    await post.save();
    res.status(200).json({ message: "Post liked successfully", post: post });
}