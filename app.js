const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Blandit libero volutpat sed cras. Congue eu consequat ac felis donec et odio pellentesque. Malesuada fames ac turpis egestas. Vitae justo eget magna fermentum. Urna porttitor rhoncus dolor purus. Eget mauris pharetra et ultrices neque ornare aenean euismod. Elementum nisi quis eleifend quam adipiscing vitae. Sed augue lacus viverra vitae congue eu consequat ac. At auctor urna nunc id cursus metus. Eget gravida cum sociis natoque penatibus et magnis dis. Venenatis cras sed felis eget velit. In metus vulputate eu scelerisque felis. Ut diam quam nulla porttitor massa id. Aliquet eget sit amet tellus cras. Id aliquet risus feugiat in ante metus dictum at tempor. Tincidunt ornare massa eget egestas.";
const aboutContent =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim. Facilisi morbi tempus iaculis urna. Eget aliquet nibh praesent tristique magna sit. Vitae elementum curabitur vitae nunc sed velit dignissim. Sem et tortor consequat id porta. Id velit ut tortor pretium. Quis varius quam quisque id diam vel quam. Scelerisque eleifend donec pretium vulputate sapien. Viverra aliquet eget sit amet tellus. Nam aliquam sem et tortor consequat id. Id leo in vitae turpis.";
const contactContent =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor commodo ullamcorper. Faucibus et molestie ac feugiat sed lectus vestibulum. Odio ut enim blandit volutpat maecenas. Dui vivamus arcu felis bibendum ut tristique et egestas. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Quam adipiscing vitae proin sagittis nisl rhoncus. Amet est placerat in egestas erat imperdiet sed. Dolor sed viverra ipsum nunc aliquet. Curabitur gravida arcu ac tortor dignissim convallis aenean et.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustermongodb-weolp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URL, {
	useNewUrlParser: true,
});

const postSchema = { title: String, content: String };
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
	Post.find({}, (err, foundPosts) => {
		res.render("home", {
			startingContent: homeStartingContent,
			newPosts: foundPosts,
		});
	});
});

app.get("/about", (req, res) => {
	res.render("about", { abtContent: aboutContent });
	// rendering about.ejs file to "/about" and passing data to ejs file
});

app.get("/contact", (req, res) => {
	res.render("contact", { cntctContent: contactContent });
	// rendering contact.ejs file to "/contact" and passing data to ejs file
});

app.get("/compose", (req, res) => {
	res.render("compose");
});

app.post("/compose", (req, res) => {
	// creating post conform mongoose schema
	const post = new Post({
		title: req.body.compTitle,
		content: req.body.compBody,
	});
	// saving posts to DB
	post.save((err) => {
		if (!err) {
			res.redirect("/");
		}
	});
});

app.get("/posts/:postId", (req, res) => {
	const requestedPostId = req.params.postId;
	Post.findOne({ _id: requestedPostId }, (err, foundPost) => {
		// res.json(foundPost);
		res.render("post", {
			blogTitle: foundPost.title,
			blogBody: foundPost.content,
		});
	});
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
