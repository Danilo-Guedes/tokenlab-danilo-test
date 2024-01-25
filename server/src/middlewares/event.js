const { handleEventList } = require("../controllers/event");
const Event = require("../models/event");
const {
  isAfter,
  isBefore,
  isWithinInterval,
  addMinutes,
  subMinutes,
} = require("date-fns");

const overlapDateMiddleware = async (req, res, next) => {
  const eventList = await Event.find({ ownerId: req.body.user.id }).populate(
    "guests"
  );
  const incomingEvent = req.body;

    console.log({LENGTH: eventList?.length, eventList, incomingEvent});

  const isOverlap = eventList.some((event) => {
    const eventStartDate = new Date(event.startDateAndHour);
    let eventEndDate = new Date(event.endDateAndHour);
    const incomingStartDate = new Date(incomingEvent.startDateAndHour);
    const incomingEndDate = new Date(incomingEvent.endDateAndHour);

    const checkStartDate = isWithinInterval(incomingStartDate, {
      start: eventStartDate,
      end: subMinutes(eventEndDate, 1), // subtract 1 minute allow to create and event that starts 08am when another event ends at 08am
    });
    const checkEndDate = isWithinInterval(incomingEndDate, {
      start: addMinutes(eventStartDate, 1), // add 1 minute allow to create and event that ends 08am when another event starts at 08am
      end: eventEndDate,
    });
    const checkBothDates =
      isBefore(incomingStartDate, eventStartDate) &&
      isAfter(incomingEndDate, eventEndDate);

    console.log({
      checkStartDate,
      checkEndDate,
      checkBothDates,
    });

    return checkStartDate || checkEndDate || checkBothDates;
  });

  if (isOverlap) {
    return res
      .status(400)
      .json({ error: "Event overlaps with existing event date" });
  }

  next();
};

module.exports = overlapDateMiddleware;
