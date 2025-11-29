const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { setInternshipDates } = require("../controllers/dateController");

router.put(
  "/assign",
  protect,
  allowRoles("admin"),
  setInternshipDates
);

module.exports = router;
