const express = require("express");
const { check } = require("express-validator");
const {
  createEventHandler,
  handleEventList,
  handleEventDelete,
  handleGetEventById,
  handleEditEvent,
} = require("../controllers/event");
const validationMiddleware = require("../middlewares/validation");
const authMiddleware = require("../middlewares/auth");
const overlapDateMiddleware = require("../middlewares/event");

const router = express.Router();

router.get("/", authMiddleware, handleEventList);

router.get("/:id", authMiddleware, handleGetEventById);

router.post(
  "/create-event",
  [
    authMiddleware,
    check("name").isLength({ min: 1 }).withMessage("Name is required"),
    check("description")
      .isLength({ min: 1 })
      .withMessage("Description is required"),
    check("startDateAndHour")
      .isISO8601()
      .withMessage("Start date and hour must be a valid date"),
    check("endDateAndHour")
      .isISO8601()
      .withMessage("End date and hour must be a valid date"),
    check("ownerId").isLength({ min: 1 }).withMessage("Owner ID is required"),
    validationMiddleware,
    overlapDateMiddleware,
  ],
  (req, res) => {
    createEventHandler(req, res);
  }
);

router.delete("/:id", authMiddleware, handleEventDelete);

router.put(
  "/:id",
  [
    authMiddleware,
    check("name").isLength({ min: 1 }).withMessage("Name is required"),
    check("description")
      .isLength({ min: 1 })
      .withMessage("Description is required"),
    check("startDateAndHour")
      .isISO8601()
      .withMessage("Start date and hour must be a valid date"),
    check("endDateAndHour")
      .isISO8601()
      .withMessage("End date and hour must be a valid date"),
    validationMiddleware,
  ],
  handleEditEvent
);

module.exports = router;
