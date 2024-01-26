const Event = require("../models/event");
const { hasOverLapDates } = require("../utils/dates");

async function ownerOverlapDateMiddleware(req, res, next) {
  const incomingEvent = req.body;

  const paramId = req.params.id;

  const eventList = await Event.find({ ownerId: req.body.user.id })
    .where({ _id: { $ne: paramId } })
    .populate("guests");

  const hasOverLap = hasOverLapDates(incomingEvent, eventList);

  if (hasOverLap) {
    return res
      .status(400)
      .json({ error: "Event overlaps with existing event date" });
  }

  next();
}

async function guestsOverlapDateMiddleware(req, res, next) {
  const paramId = req.params.id;
  const incomingGuestList = req.body.guests;

  const incomingEvent = req.body;

  const getGuestEventsPromises = incomingGuestList.map((guestId) => {
    return new Promise(async (resolve, reject) => {
      const events = await Event.find({ ownerId: guestId }).where({
        _id: { $ne: paramId },
      });

      if (!events) {
        return resolve({ guestId, events: [] });
      }
      return resolve({ guestId, events });
    });
  });

  let guestsEventList = [];

  await Promise.all(getGuestEventsPromises)
    .then((guestEvents) => {
      guestsEventList = guestEvents;
    })
    .catch((error) => {
      console.log(error);
    });

  const checkForAllGuestsOverlapDates = guestsEventList?.map((guestEvent) => {
    const hasOverLap = hasOverLapDates(incomingEvent, guestEvent.events);

    return { guestId: guestEvent?.guestId, hasOverLap };
  });


  const guestsWithOverlaps = checkForAllGuestsOverlapDates?.filter(
    (guest) => guest.hasOverLap
  );

  let guestToRemove;

  if (guestsWithOverlaps?.length > 0) {
    req.body.guests = req.body.guests.filter((guest_overlap) => {
      return !guestsWithOverlaps.some(
        (guest) => guest.guestId === guest_overlap
      );
    });

    guestToRemove = guestsWithOverlaps.map((guest) => guest.guestId);

    req.body.guestToRemove = guestToRemove;
  }

  next();
}

module.exports = { ownerOverlapDateMiddleware, guestsOverlapDateMiddleware };
