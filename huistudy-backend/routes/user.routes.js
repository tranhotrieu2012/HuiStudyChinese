const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");


router.get("/me", verifyToken, userController.getMe);
router.put('/me', verifyToken, userController.updateMe);

// Cho admin
router.get('/', verifyToken, userController.getAllUsers);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
