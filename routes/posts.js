import express from "express";

const router = express.Router();

let posts = []; // Temporary storage

// 🏠 Show All Posts
router.get("/", (req, res) => {
    res.render("home", { posts });
  });

  // ➕ Show Create Post Form
router.get("/new", (req, res) => {
    res.render("new");
  });

  function getFormattedDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }
  // 📌 Handle New Post Submission
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const currentTime = new Date();
  
  posts.push({
    id: posts.length + 1,
    title,
    content,
    createdAt: currentTime,
    updatedAt: currentTime
  });

  res.redirect("/posts");
});

  // ✏️ Show Edit Post Form
router.get("/:id/edit", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    res.render("edit", { post });
  });

  // ✅ Handle Post Update (Using POST Instead of PUT)
router.post("/update/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    post.updatedAt = new Date();
  }
  res.redirect("/posts");
});

  // ❌ Handle Post Deletion (Using POST Instead of DELETE)
router.post("/delete/:id", (req, res) => {
    posts = posts.filter((p) => p.id != req.params.id);
    res.redirect("/posts");
  });
  
export default router;