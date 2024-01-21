import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/shared/PageTemplate";
import EventCard from "../../components/shared/EventCard";
import { Button } from "../../components/ui/button";
import { cn } from "../../utils/style";
import { ROUTES } from "../../utils/routes";

function Events() {
  const events = [
    {
      id: 1,
      name: "Event 1",
      description:
        "an amazing event with a lot of word that will overflow the text, and for another reason I can not stop to put more words here to fill out the space, and now I'm gonna put even more word to fill a litle more and then I can test the tailwind clamp property. Yeah but it still need a little bit more words.",
      initialDateAndHour: "2021-10-10 10:00:00",
      finalDateAndHour: "2021-10-10 10:30:00",
    },
    {
      id: 2,
      name: "Event 2 with a huge name to overflow the text, now I'm going to put even more words to fill out the space in the div.",
      description: "an amazing event",
      initialDateAndHour: "2021-10-10 10:00:00",
      finalDateAndHour: "2021-10-10 10:30:00",
    },
    {
      id: 3,
      name: "Event 3",
      description: "an amazing event",
      initialDateAndHour: "2021-10-10 10:00:00",
      finalDateAndHour: "2021-10-10 10:30:00",
    },
  ];

  return (
    <PageTemplate>
      <div className="flex flex-col w-full gap-20 my-10 ">
        <div className="flex flex-row items-center justify-center">
          <Link to={ROUTES.newEvent} className="flex items-center gap-5">
            <label
              htmlFor="add-event"
              className="text-2xl text-primary font-bold text-center hover:cursor-pointer"
            >
              Novo Evento
            </label>
            <Button>
              <Plus size={24} />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-centert">
          <img src="/src/svg/calendar.svg" alt="calendar-art" width={200} />
        </div>

        <div className="flex flex-col items-center w-full">
          <span
            className={cn(
              "text-2xl text-secondary/80 underline font-bold text-center mb-10",
              events.length === 0 && "hidden"
            )}
          >
            Próximos Eventos:
          </span>
          <div className="flex flex-col items-center mt-5 p-0 md:p-5 w-full gap-5">
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5">
                <span className="text-lg font-bold text-center max-w-80 text-gray-600">
                  Opa! Você inda não tem um evento cadastrado, qua tal ser o
                  primeiro? Clique no + acima.
                </span>
                <img src="/src/svg/sad-face.svg" alt="empty" width={200} />
              </div>
            ) : (
              events.map((event) => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default Events;
