import FeedsModels from "../models/Feeds.models.js";

function isPostOwner(post, userId) {
    return String(post.userId) === String(userId);
}

export const createPost = async (req,res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({ message: "Title and imageUrl are required" });
        }
        const newPost = await FeedsModels.create({ title, imageUrl, userId: req.user.id });
        const post = await FeedsModels.findById(newPost._id).populate('userId', 'username');
        res.status(201).json({ message: "Post created successfully", post });
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
    try {
        const { id } = req.params;
        const post = await FeedsModels.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!isPostOwner(post, req.user.id)) {
            return res.status(403).json({ message: "Not your post" });
        }
        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't delete post", error: error.message });
    }
}

export const updatePost = async (req,res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({ message: "Title and imageUrl are required" });
        }
        const post = await FeedsModels.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!isPostOwner(post, req.user.id)) {
            return res.status(403).json({ message: "Not your post" });
        }
        post.title = title;
        post.imageUrl = imageUrl;
        await post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't update post", error: error.message });
    }
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