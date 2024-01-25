const { handleEventList } = require("../controllers/event");
const Event = require("../models/event");
const { isAfter, isBefore, isWithinInterval } = require("date-fns");

const overlapDateMiddleware = async (req, res, next) => {

  const eventList = await Event.find({ownerId: req.body.user.id}).populate("guests");;
  const incomingEvent = req.body;

  console.log({LENGTH: eventList?.length, eventList, incomingEvent});



const isOverlap = eventList.some((event) => {
    const eventStartDate = new Date(event.startDateAndHour);
    const eventEndDate = new Date(event.endDateAndHour);
    const incomingStartDate = new Date(incomingEvent.startDateAndHour);
    const incomingEndDate = new Date(incomingEvent.endDateAndHour);

    const checkSatrtDate = isWithinInterval(incomingStartDate, { start: eventStartDate, end: eventEndDate });
    const checkEndDate = isWithinInterval(incomingEndDate, { start: eventStartDate, end: eventEndDate });
    const checkBothDates = (isBefore(incomingStartDate, eventStartDate) && isAfter(incomingEndDate, eventEndDate));


    return (
        checkSatrtDate ||checkEndDate ||checkBothDates
    );
});


  if (isOverlap) {
    return res
      .status(400)
      .json({ error: "Event overlaps with existing event date" });
  }

  next();
};

module.exports = overlapDateMiddleware;
