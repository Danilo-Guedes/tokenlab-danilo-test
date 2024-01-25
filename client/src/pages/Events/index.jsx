import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/shared/PageTemplate";
import EventCard from "../../components/shared/EventCard";
import { Button } from "../../components/ui/button";
import { getEventsApi } from "@/src/api/event";
import { cn } from "../../utils/style";
import { ROUTES } from "../../utils/routes";
import { useQuery } from "@tanstack/react-query";
import CalendarSvg from "@/src/components/shared/CalendarSvg";

function Events() {
  const { data,  isLoading } = useQuery({
    queryFn: getEventsApi,
    queryKey: ["events-list"],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      alert("aqui deu bom");
      console.log(data);
    },
  });

  const events = data?.data;

  if (isLoading) {
    return (
      <PageTemplate>
        <div className="flex w-full  h-screen items-center justify-center animate-pulse">
          Carregando...
        </div>
      </PageTemplate>
    );
  }

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
          <CalendarSvg />
        </div>

        <div className="flex flex-col items-center w-full">
          <span
            className={cn(
              "text-2xl text-secondary/80 underline font-bold text-center mb-10",
              events?.length === 0 && "hidden"
            )}
          >
            Próximos Eventos:
          </span>
          <div className="flex flex-col items-center mt-5 p-0 md:p-5 w-full gap-5">
            {events?.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5">
                <span className="text-lg font-bold text-center max-w-80 text-gray-600">
                  Opa! Você inda não tem um evento cadastrado, qua tal ser o
                  primeiro? Clique no + acima.
                </span>
                <img src="/src/svg/sad-face.svg" alt="empty" width={200} />
              </div>
            ) : (
              events.map((event) => <EventCard key={event._id} event={event} />)
            )}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default Events;
