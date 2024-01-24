import { useQuery } from "@tanstack/react-query";

import PageTemplate from "@/src/components/shared/PageTemplate";
import EditEventForm from "./components/EditEventForm";
import { getEventByIdApi } from "@/src/api/event";
import { useParams } from "react-router";

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

  if (isFetching) return <div>Carregando...</div>;

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 xl:px-44">
        <div className="my-10">
          <img src="/src/svg/calendar.svg" alt="calendar-art" width={200} />
        </div>
        DETAKLHES
        <EditEventForm event={data?.data} />
      </div>
    </PageTemplate>
  );
}

export default EventDetails;
