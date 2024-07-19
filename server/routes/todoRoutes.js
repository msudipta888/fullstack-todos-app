const express = require("express");
const router = express.Router();
const Todo = require("../model/Todo");
const auth = require("../middelware/auth");

// Create a new Todo
router.post("/todos", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  try {
    console.log("Request body: ",req.body);
    console.log("Authenticated user: ", req.user);
    if (!req.user || !req.user._id) {
      console.log("User information is missing or incorrect:", req.user);
      return res.status(400).json({ message: "User information is missing" });
    }

    const newTodo = new Todo({
      user:req.user._id,
      text:req.body.text,
      completed: false,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error("Error creating Todo:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all Todos for a user
router.get("/todos", auth, async (req, res) => {
  try {
    console.log("Authenticated user: ", req.user);
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error retrieving Todos:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a Todo
router.put("/todos/:id", auth, async (req, res) => {
  try {
    console.log("Authenticated user: ", req.user);
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error updating Todo:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a Todo
router.delete("/todos/:id", auth, async (req, res) => {
  try {
    console.log("Authenticated user: ", req.user);
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Error deleting Todo:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
