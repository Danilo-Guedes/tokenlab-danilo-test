import { Eye, Trash, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import DeleteEventModal from "./DeleteEventModal";
import { Link } from "react-router-dom";
import { ROUTES } from "@/src/utils/routes";

function EventCard({ event }) {
  const initialDate = new Date(event.startDateAndHour);
  const initialDateHour = initialDate.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    hour: "numeric",
    hour12: true,
  });
  const finalDate = new Date(event.endDateAndHour);
  const finalDateHour = finalDate.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    hour: "numeric",
    hour12: true,
  });

  function createGuestsName(guests) {
    let guestsName = guests.map((guest) => guest.name?.split(" ")[0]);
    guestsName = guestsName.join(", ");
    return "Participantes : " + guestsName;
  }

  return (
    <div className="flex flex-col lg:flex-row border items-stretch rounded-2xl w-full lg:h-56 p-3 lg:p-5 shadow-md gap-5 border-primary shadow-primary">
      <div className="flex flex-col items-center lg:items-start justify-start lg:w-48 overflow-hidden ">
        <span
          title={event.name}
          className="text-lg text-ellipsis line-clamp-3 text-secondary font-bold text-start break-all  "
        >
          {event.name}
        </span>
      </div>
      <div className="flex flex-col  gap-8 lg:gap-3 lg:w-64">
        <div className="flex flex-col items-center lg:items-start lg:justify-start text-sm gap-2 ">
          <Calendar size={24} className="text-primary" />
          <span>
            De:{" "}
            {initialDate.toLocaleDateString("pt-BR", { dateStyle: "short" })} as{" "}
            {initialDateHour}
          </span>
          <span>
            Até: {finalDate.toLocaleDateString("pt-BR", { dateStyle: "short" })}{" "}
            as {finalDateHour}
          </span>
        </div>
        <div className="flex flex-row overflow-hidden line-clamp-2">
          {event.guests?.length === 0 ? (
            <span className="text-gray-500">Sem participantes</span>
          ) : (
            <>
              <span className="flex-wrap text-ellipsis line-clamp-3">
                {createGuestsName(event.guests)}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="my-10 lg:my-0 flex flex-1 flex-col items-start bg-primary/20 rounded-lg p-1 lg:p-4 ">
        <span
          title={event.description}
          className="text-ellipsis line-clamp-3 text-secondary font-bold text-start"
        >
          {event.description}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center">
        <Link to={ROUTES.eventDetails(event._id)}>
          <Button variant="ghost" className="mr-2">
            <Eye />
          </Button>
        </Link>
        <DeleteEventModal
          triggerButton={
            <Button variant="destructive">
              <Trash />
            </Button>
          }
          eventData={event}
        />
      </div>
    </div>
  );
}

export default EventCard;
