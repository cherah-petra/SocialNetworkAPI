const router = require("express").Router();
const userRoutes = require("./api/userRoutes.js");
const thoughtRoutes = require("./api/thoughtRoutes");
const reactionRoutes = require("./api/reactionRoutes");
const friendRoutes = require("./api/friendRoutes");


router.use("/api/userRoutes", userRoutes);
router.use("/api/thoughtRoutes", thoughtRoutes);
router.use("/api/thoughts/:thoughtId/reactionRoutes", reactionRoutes);
router.use("/api/users/:userId/friendRoutes", friendRoutes);

// router.use((req, res) => res.send("Wrong route!"));

module.exports = router;

