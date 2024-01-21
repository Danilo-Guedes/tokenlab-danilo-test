import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { Calendar } from "lucide-react"; // Import the Calendar icon from lucide-react

import PageTemplate from "../../components/shared/PageTemplate";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

function NewEvent() {
  const [startDateAndHour, setStartDateAndHour] = useState("");
  const [endDateAndHour, setEndDateAndHour] = useState("");

  return (
    <PageTemplate>
      <div className="flex flex-col items-center justify-center w-full px-3 md:px-32">
        <div className="my-10">
          <img src="/src/svg/calendar.svg" alt="calendar-art" width={200} />
        </div>
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
          <div className="grid md:grid-cols-2 md:gap-10 w-full">
            <div className="flex flex-col items-start justify-center w-full gap-5">
              <label
                htmlFor="event-initial-date"
                className="text-lg text-secondary font-bold text-center"
              >
                Data e hora de início
              </label>
              <div className="flex items-center w-full">
                <Calendar size={30} className="text-primary" />
                <DatePicker
                  id="event-initial-date"
                  className="w-full border border-primary rounded-lg p-2"
                  placeholder="Preencha..."
                  showTimeSelect
                  locale={ptBR}
                  selected={startDateAndHour}
                  todayButton="Hoje"
                  dateFormat="Pp"
                  onChange={(date) => {
                    // console.log("date: ", date);
                    setStartDateAndHour(date);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-5">
              <label
                htmlFor="event-final-date"
                className="text-lg text-secondary font-bold text-center"
              >
                Data e hora de término
              </label>
              <div className="flex items-center w-full">
                <Calendar size={30} className="text-primary" />
                <DatePicker
                  id="event-final-date"
                  className="w-full border border-primary rounded-lg p-2"
                  placeholder="Preencha..."
                  showTimeSelect
                  locale={ptBR}
                  selected={endDateAndHour}
                  todayButton="Hoje"
                  dateFormat="Pp"
                  onChange={(date) => {
                    // console.log("date: ", date);
                    setEndDateAndHour(date);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageTemplate>
  );
}

export default NewEvent;
