import { useQuery } from "@tanstack/react-query";

import PageTemplate from "@/src/components/shared/PageTemplate";
import EditEventForm from "./components/EditEventForm";
import { getEventByIdApi } from "@/src/api/event";
import { useParams } from "react-router";
import { getUsersApi } from "@/src/api/user";
import CalendarSvg from "@/src/components/shared/CalendarSvg";

function EventDetails() {

  const param = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["eventDetails"],
    queryFn: getEventByIdApi.bind(null, param.id),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ event }) => {
      alert("aqui deu bom");
      console.log({ event });
    },
  });

  const { data: guests, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });




  if (isFetching || isLoading) return <div>Carregando...</div>;

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 xl:px-44">
        <div className="my-10">
          <CalendarSvg />
        </div>
        <EditEventForm event={data?.data} guests={guests} />
      </div>
    </PageTemplate>
  );
}

export default EventDetails;
