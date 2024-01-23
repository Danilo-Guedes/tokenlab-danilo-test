const Event = require("../models/event");
async function createEventHandler(req, res) {
  // Handle the logic for creating an event

  console.log("THE BODY", req.body);
  try {
    const {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    } = req.body;

    console.log({
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    });

    const newEvent = {
      name,
      description,
      startDateAndHour,
      endDateAndHour,
      ownerId,
      guests,
    };

    let event = await Event.create(newEvent);

    console.log({ eventobj: event.toObject() });

    if (!event) {
      return res
        .status(400)
        .json({ error: true, message: "Event not created" });
    }

    res
      .status(201)
      .json({ message: "event created succesfully", data: event.toObject() });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createEventHandler };