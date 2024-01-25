const Event = require("../models/event");

async function handleEventList(req, res) {
  try {
    const events = await Event.find({ ownerId: req.body.user.id })
      .populate("guests")
      .sort({ endDateAndHour: 1 });

    if (!events) {
      return res
        .status(200)
        .json({ message: "events list is empty", data: events });
    }

    res.status(200).json({ message: "Events found", data: events });
  } catch (error) {
    console.log(error);
  }
}

async function handleGetEventById(req, res) {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).populate("guests");

    if (!event) {
      return res.status(404).json({ error: true, message: "Event not found" });
    }

    res.status(200).json({ message: "Event found", data: event });
  } catch (error) {
    console.log(error);
  }
}

async function createEventHandler(req, res) {
  try {
    const {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    } = req.body;

    const newEvent = {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    };

    let event = await Event.create(newEvent);

    if (!event) {
      return res
        .status(400)
        .json({ error: true, message: "Event not created" });
    }

    res
      .status(201)
      .json({
        message: "event created succesfully",
        data: { ...event.toObject(), guestToRemove: req.body?.guestToRemove },
      });
  } catch (error) {
    console.log(error);
  }
}

async function handleEventDelete(req, res) {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: true, message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}

async function handleEditEvent(req, res) {
  try {
    const eventId = req.params.id;
    const {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    } = req.body;

    const updatedEvent = {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    };

    const event = await Event.findByIdAndUpdate(eventId, updatedEvent, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ error: true, message: "Event not found" });
    }

    res
      .status(200)
      .json({
        message: "Event updated",
        data: { ...event.toObject(), guestToRemove: req.body?.guestToRemove },
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createEventHandler,
  handleEventList,
  handleEventDelete,
  handleGetEventById,
  handleEditEvent,
};
