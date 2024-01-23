import { Eye, Edit, Trash, Calendar } from "lucide-react";
import { Button } from "../ui/button";

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

  return (
    <div className="flex flex-col md:flex-row border items-stretch rounded-2xl w-full md:h-36 p-3 lg:p-5 shadow-md gap-5 border-primary shadow-primary">
      <div className="flex flex-col items-center md:items-start justify-start md:w-36 overflow-hidden ">
        <span
          title={event.name}
          className="text-lg text-ellipsis line-clamp-3 text-secondary font-bold text-start break-all  "
        >
          {event.name}
        </span>
      </div>
      <div className="flex flex-col items-center md:items-start md:justify-start text-sm gap-2">
        <Calendar size={24} className="text-primary" />
        <span>
          De: {initialDate.toLocaleDateString("pt-BR", { dateStyle: "short" })}{" "}
          as {initialDateHour}
        </span>
        <span>
          Até: {finalDate.toLocaleDateString("pt-BR", { dateStyle: "short" })}{" "}
          as {finalDateHour}
        </span>
      </div>
      <div className="flex flex-1 flex-col items-start bg-primary/20 rounded-lg p-1 md:p-4 ">
        <span
          title={event.description}
          className="text-ellipsis line-clamp-3 text-secondary font-bold text-start"
        >
          {event.description}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center">
        <Button variant="ghost" className="mr-2">
          <Eye />
        </Button>
        <Button className="mr-2" variant="ghost">
          <Edit />
        </Button>
        <Button variant="destructive">
          <Trash />
        </Button>
      </div>
    </div>
  );
}

export default EventCard;
