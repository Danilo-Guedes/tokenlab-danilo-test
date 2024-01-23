const express = require("express");
const { check } = require("express-validator");
const { createEventHandler } = require("../controllers/event");
const validationMiddleware = require("../middlewares/validation");

const router = express.Router();

router.post(
  "/create-event",
  // [
  //   check("name").isLength({ min: 1 }).withMessage("Name is required"),
  //   check("description")
  //     .isLength({ min: 1 })
  //     .withMessage("Description is required"),
  //   check("startDateAndHour")
  //     .isISO8601()
  //     .withMessage("Start date and hour must be a valid date"),
  //   check("endDateAndHour")
  //     .isISO8601()
  //     .withMessage("End date and hour must be a valid date"),
  //   check("ownerId").isLength({ min: 1 }).withMessage("Owner ID is required"),
  //   validationMiddleware,
  // ],
  (req, res) => createEventHandler(req, res)
);

module.exports = router;
