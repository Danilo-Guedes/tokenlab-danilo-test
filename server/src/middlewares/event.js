const Event = require("../models/event");
const { hasOverLapDates } = require("../utils/dates");

async function ownerOverlapDateMiddleware(req, res, next) {
  const incomingEvent = req.body;

  const paramId = req.params.id;

  console.log({incomingEvent, paramId});
  const eventList = await Event.find({ ownerId: req.body.user.id })
    .where({ _id: { $ne: paramId } })
    .populate("guests");

  // console.log({LENGTH: eventList?.length, eventList, incomingEvent});

  const hasOverLap = hasOverLapDates(incomingEvent, eventList);

  if (hasOverLap) {
    return res
      .status(400)
      .json({ error: "Event overlaps with existing event date" });
  }

  next();
}

async function guestsOverlapDateMiddleware(req, res, next) {
  console.log(req.body);


  const paramId = req.params.id;
  const incomingGuestList = req.body.guests;

  const incomingEvent = req.body;

  const getGuestEventsPromises = incomingGuestList.map((guestId) => {
    console.log({ guestId });

    return new Promise(async (resolve, reject) => {
      const events = await Event.find({ ownerId: guestId }).where({_id: {$ne: paramId}});

      console.log({ events });

      if (!events) {
        return resolve({ guestId, events: [] });
      }
      return resolve({ guestId, events });
    });
  });

  let guestsEventList = [];

  await Promise.all(getGuestEventsPromises)
    .then((guestEvents) => {
      console.log({ guestEvents: JSON.stringify(guestEvents) });

      guestsEventList = guestEvents;
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log({
  //   guestsEventList: JSON.stringify(guestsEventList),
  //   typeof: typeof guestsEventList,
  // });

  const checkForAllGuestsOverlapDates = guestsEventList?.map((guestEvent) => {
    const hasOverLap = hasOverLapDates(incomingEvent, guestEvent.events);

    console.log({ nomap: guestEvent });

    return { guestId: guestEvent?.guestId, hasOverLap };
  });

  console.log({
    checkForAllGuestsOverlapDates: JSON.stringify(
      checkForAllGuestsOverlapDates
    ),
  });

  const guestsWithOverlaps = checkForAllGuestsOverlapDates?.filter(
    (guest) => guest.hasOverLap
  );

  console.log({ guestsWithOverlaps });

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
