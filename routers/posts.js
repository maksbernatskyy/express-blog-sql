const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController')

// index
router.get("/", postController.index);

// show
router.get("/:id", postController.show);

// destroy
router.delete("/:id", postController.destroy);

// store
router.post("/", postController.store)

// update
router.put("/:id", postController.update)

module.exports = router;
