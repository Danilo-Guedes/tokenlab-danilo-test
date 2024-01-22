import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { isSameDay, setMinutes } from "date-fns";
import { Calendar } from "lucide-react";

import { Input } from "@/src/components/ui/input";

import { Textarea } from "@/src/components/ui/textarea";
import AddPersonToEventSelect from "@/src/components/shared/AddPersonToEventSelect";
import { Button } from "@/src/components/ui/button";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function NewEventForm() {
  const [startDateAndHour, setStartDateAndHour] = useState("");
  const [endDateAndHour, setEndDateAndHour] = useState("");

  const [initialMinTime, setInitialMinTime] = useState(
    setMinutes(new Date(), 0),
    0
  );
  const [finalMinTime, setFinalMinTime] = useState(
    setMinutes(new Date(), 0),
    0
  );

  function resetInitialMinTime(date) {
    setInitialMinTime(setMinutes(new Date(date), 0), 0);
  }
  function resetFinalMinTime(date) {
    setFinalMinTime(setMinutes(new Date(date), 0), 0);
  }

  return (
    <form className="flex flex-col items-center justify-center w-full gap-5 md:px-32">
      <div className="flex flex-col items-start justify-center w-full gap-5">
        <label
          htmlFor="event-name"
          className="text-lg text-secondary font-bold text-center"
        >
          Nome do evento
        </label>
        <Input
          id="event-name"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
        />
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-5">
        <label
          htmlFor="event-description"
          className="text-lg text-secondary font-bold text-center"
        >
          Descrição do evento
        </label>
        <Textarea
          id="event-description"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5 md:gap-10 w-full">
        <div className="flex flex-col items-start justify-center w-full gap-5">
          <label
            htmlFor="event-initial-date"
            className="text-lg text-secondary font-bold text-center"
          >
            Data e hora de início
          </label>

          <DatePicker
            id="event-initial-date"
            className="w-full border border-primary rounded-lg p-2"
            placeholderText="Selecione..."
            showTimeSelect
            locale={ptBR}
            selected={startDateAndHour}
            todayButton="Hoje"
            dateFormat="Pp"
            onChange={(date) => {
              setStartDateAndHour(date);
              if (isSameDay(new Date(), date)) {
                setInitialMinTime(new Date());
              } else {
                resetInitialMinTime(date);
              }
            }}
            showIcon
            icon={<Calendar className="text-primary" />}
            isClearable
            toggleCalendarOnIconClick
            minDate={new Date(Date.now())}
            minTime={initialMinTime}
            maxTime={new Date().setHours(23, 59, 59)}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-5">
          <label
            htmlFor="event-final-date"
            className="text-lg text-secondary font-bold text-center"
          >
            Data e hora de término
          </label>

          <DatePicker
            id="event-final-date"
            className="w-full border border-primary rounded-lg p-2"
            placeholderText="Selecione..."
            showTimeSelect
            locale={ptBR}
            selected={endDateAndHour}
            todayButton="Hoje"
            dateFormat="Pp"
            onChange={(date) => {
              // console.log("date: ", date);
              setEndDateAndHour(date);
              if (isSameDay(startDateAndHour, date)) {
                setFinalMinTime(startDateAndHour);
              } else {
                resetFinalMinTime(date);
              }
            }}
            showIcon
            icon={<Calendar className="text-primary" />}
            isClearable
            toggleCalendarOnIconClick
            minDate={startDateAndHour || new Date(Date.now())}
            minTime={finalMinTime}
            maxTime={new Date().setHours(23, 59, 59)}
          />
        </div>
      </div>
      <AddPersonToEventSelect options={options} />
      <Button className="w-full mt-5" >
        Adicionar Evento
      </Button>
    </form>
  );
}

export default NewEventForm;
