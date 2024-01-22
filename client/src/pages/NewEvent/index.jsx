
import PageTemplate from "@/src/components/shared/PageTemplate";
import NewEventForm from "./components/NewEventForm";


function NewEvent() {
 

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 md:px-44">
        <div className="my-10">
          <img src="/src/svg/calendar.svg" alt="calendar-art" width={200} />
        </div>
        <NewEventForm/>
      </div>
    </PageTemplate>
  );
}

export default NewEvent;
