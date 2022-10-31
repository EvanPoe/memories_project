import mongoose, { mongo } from "mongoose";

// with mongoDB you can create a variety of documents.  Using Schema, we can define exactly what a post will look like
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

// now that we have a schema, we need to turn it into a model. 
const PostMessage = mongoose.model('PostMessage', postSchema);

//we are exporting a mongoose model from the postMessage file, and then on that model, later on we'll be able to run commands such as find, create, delete, and update
export default PostMessage;