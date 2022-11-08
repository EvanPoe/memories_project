// here we create all the handlers for our routes.  This way we can cleanly seperate the logic into this file and use them as variables in the /routes/posts.js file

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log(postMessage)

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost =  async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body);

    try {
        await newPost.save();
        // codes at https://www.restapitutorial.com/httpstatuscodes.html
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
};

export const updatePost =  async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
};