const express = require("express");
const Item = require("../models/item");
const authenticateToken = require("../middleware/authenticateToken"); 
const router = express.Router();

// CREATE: Add a new item (Protected route)
router.post("/",  authenticateToken, async (req, res) => {
  const { name, description, price } = req.body;

  const newItem = new Item({
    name,
    description,
    price,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ: Retrieve all items(Protected route)
router.get("/",  authenticateToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ: Retrieve a specific item by ID (Protected route)
router.get("/:id",  authenticateToken,  async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE: Update an existing item (Protected route)
router.put("/:id",  authenticateToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove an item by ID (Protected route)
router.delete("/:id",  authenticateToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
