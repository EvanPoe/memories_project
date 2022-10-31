// here we create all the handlers for our routes.  This way we can cleanly seperate the logic into this file and use them as variables in the /routes/posts.js file

export const getPosts = (req, rest) => {
    rest.send('THIS WORKS!');
}