import { useQuery } from "@tanstack/react-query";
import PageTemplate from "@/src/components/shared/PageTemplate";
import NewEventForm from "./components/NewEventForm";
import { getUsersApi } from "@/src/api/user";
import CalendarSvg from "@/src/components/shared/CalendarSvg";

function NewEvent() {
  const { data: guests, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });

  if (isLoading) {
    return (
      <PageTemplate>
        <div>Carregando...</div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 xl:px-44">
        <div className="my-10">
        <CalendarSvg />
        </div>
        <NewEventForm guests={guests} />
      </div>
    </PageTemplate>
  );
}

export default NewEvent;
