const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

// Kết nối đến MongoDB
mongoose.connect('mongodb+srv://admin:123@simple-blog.3ezlv.mongodb.net/?retryWrites=true&w=majority&appName=simple-blog')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));


// Định nghĩa Schema và Model cho Post
const postSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});
const Post = mongoose.model("Post", postSchema);

// Endpoints cho Posts
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Error fetching posts");
    }
});

app.get("/api/post/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        post ? res.json(post) : res.status(404).send("Not found");
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        res.status(500).send("Error fetching post");
    }
});

app.post("/api/post", jsonParser, async (req, res) => {
    try {
        const newPost = new Post({
            slug: req.body.slug,
            title: req.body.title,
            description: req.body.description,
        });
        await newPost.save();
        res.status(200).send({ message: "Posted successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
});

// Endpoint Login
app.post("/api/login", jsonParser, (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123") {
        res.status(200).send({ message: "Login successful" });
    } else {
        res.status(400).send({ message: "Login failed" });
    }
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
