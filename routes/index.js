const router = require("express").Router();
const userRoutes = require("./api/userRoutes.js");
const thoughtRoutes = require("./api/thoughtRoutes");


router.use("/api/userRoutes", userRoutes);
router.use("/api/thoughtRoutes", thoughtRoutes);


module.exports = router;

