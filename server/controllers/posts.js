// here we create all the handlers for our routes.  This way we can cleanly seperate the logic into this file and use them as variables in the /routes/posts.js file
import express from 'express';
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        // console.log(postMessage)

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPost =  async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();
        // codes at https://www.restapitutorial.com/httpstatuscodes.html
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error });        
    }
};

export const updatePost =  async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = { ...post, _id };

    await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const deletePost =  async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE');

    res.json({ message: 'Post deleted successfully' });
};

export const likePost =  async (req, res) => {
    const { id } = req.params;

    if(!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        // like the post
        post.likes.push(req.userId);
    }   else {
        // dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
};

export default router;