import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { isSameDay, setMinutes, setHours, addMinutes } from "date-fns";
import { Calendar } from "lucide-react";

import { Input } from "@/src/components/ui/input";

import { Textarea } from "@/src/components/ui/textarea";
import AddPersonToEventSelect from "@/src/components/shared/AddPersonToEventSelect";
import { Button } from "@/src/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventApi } from "@/src/api/event";
import useUserData from "@/src/hooks/useUserData";
import { useToast } from "@/src/hooks/use-toast";
import { useNavigate } from "react-router";
import { ROUTES } from "@/src/utils/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome do evento é obrigatório"),
  description: Yup.string().required("Descrição do evento é obrigatória"),
  startDateAndHour: Yup.date().required("Data de início é obrigatória"),
  endDateAndHour: Yup.date()
    .required("Data de término é obrigatória")
    .min(
      Yup.ref("startDateAndHour"),
      "Data de término deve ser maior que a data de início"
    ),
  guests: Yup.array()
    .of(
      Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    )
    .optional()
    .default([]),
});

function NewEventForm({ guests }) {
  const [startDateAndHour, setStartDateAndHour] = useState("");
  const [endDateAndHour, setEndDateAndHour] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [addPersonKey, setAddPersonKey] = useState(0);

  const [initialMinTime, setInitialMinTime] = useState(
    setMinutes(new Date(), 0),
    0
  );
  const [finalMinTime, setFinalMinTime] = useState(
    setMinutes(new Date(), 0),
    0
  );

  function resetInitialMinTime(date) {
    setInitialMinTime(setHours(setMinutes(new Date(date), 0), 0));
  }
  function resetFinalMinTime(date) {
    setFinalMinTime(setHours(setMinutes(new Date(date), 0), 0));
  }
  const { user } = useUserData();
  const { mutate } = useMutation({
    mutationFn: createEventApi,
    onError: (error) => {
      console.log(error);

      if (error.response?.data?.error?.includes("overlap")) {
        toast({
          title: "Opa",
          description:
            "Você já tem um evento nesse horário, verifique seu calendário",
          variant: "destructive",
        });

        formik.resetForm();
        setStartDateAndHour("");
        setEndDateAndHour("");
        setAddPersonKey((prev) => prev + 1);
        return;
      }
      toast({
        title: "Opa",
        description: "Algo de errado com a sua criação",
        variant: "destructive",
      });
    },
    onSuccess: ({ data }) => {
      if (data?.guestToRemove?.length > 0) {
        toast({
          title: "Atenção!!",
          description: `O Evento ${data.name} foi criado, porém o(s) convidado(s) com id ${data?.guestToRemove?.map(v => `${v} ` )} não fora(m) adicionado(s)`,
          variant: "warning",
        });
      } else {
        toast({
          title: "Evento criado com sucesso",
          description: `"${data.name}" criado com sucesso`,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["events-list"] });
      navigate(ROUTES.events);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDateAndHour: "",
      endDateAndHour: "",
      guests: [],
    },
    validationSchema,
    onSubmit: (values) => {
      values.ownerId = user?.id;

      values.guests = values.guests.map((guest) => guest.value);

      mutate(values);
    },
  });

  useEffect(() => {
    if (startDateAndHour === "") return;

    setFinalMinTime(startDateAndHour);
  }, [startDateAndHour]);

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-5 lg:px-32"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label
          htmlFor="event-name"
          className="text-lg text-secondary font-bold text-center mb-5"
        >
          Nome do evento
        </label>
        <Input
          id="event-name"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <span className="text-sm text-red-500">{formik.errors.name}</span>
        ) : null}
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <label
          htmlFor="event-description"
          className="text-lg text-secondary font-bold text-center mb-5"
        >
          Descrição do evento
        </label>
        <Textarea
          id="event-description"
          className="w-full border border-primary rounded-lg p-2"
          placeholder="Preencha..."
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <span className="text-sm text-red-500">
            {formik.errors.description}
          </span>
        ) : null}
      </div>
      {/* Rest of the form */}
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 w-full">
        <div className="flex flex-col items-start justify-center w-full gap-1">
          <label
            htmlFor="event-initial-date"
            className="text-lg text-secondary font-bold text-center mb-5"
          >
            Início
          </label>

          <DatePicker
            id="event-initial-date"
            className="w-full border border-primary rounded-lg p-2"
            placeholderText="Selecione data e hora..."
            showTimeSelect
            locale={ptBR}
            selected={startDateAndHour}
            todayButton="Hoje"
            dateFormat="Pp"
            onChange={(date) => {
              setStartDateAndHour(date);
              formik.setFieldValue("startDateAndHour", date);
              if (isSameDay(new Date(), date)) {
                setInitialMinTime(new Date());
              } else {
                resetInitialMinTime(date);
              }
              setEndDateAndHour("");
            }}
            showIcon
            icon={<Calendar className="text-primary" />}
            isClearable
            toggleCalendarOnIconClick
            minDate={new Date(Date.now())}
            minTime={initialMinTime}
            maxTime={new Date().setHours(23, 59, 59)}
            autoComplete="off"
          />
          {formik.touched.startDateAndHour && formik.errors.startDateAndHour ? (
            <span className="text-sm text-red-500">
              {formik.errors.startDateAndHour}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-1">
          <label
            htmlFor="event-final-date"
            className="text-lg text-secondary font-bold text-center mb-5"
          >
            Término
          </label>

          <DatePicker
            id="event-final-date"
            className="w-full border border-primary rounded-lg p-2"
            placeholderText="Selecione data e hora..."
            showTimeSelect
            locale={ptBR}
            selected={endDateAndHour}
            todayButton="Hoje"
            dateFormat="Pp"
            onChange={(date) => {
              setEndDateAndHour(date);
              formik.setFieldValue("endDateAndHour", date);
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
            minTime={addMinutes(finalMinTime, 30) || new Date(Date.now())}
            maxTime={new Date().setHours(23, 59, 59)}
            autoComplete="off"
          />
          {formik.touched.endDateAndHour && formik.errors.endDateAndHour ? (
            <span className="text-sm text-red-500">
              {formik.errors.endDateAndHour}
            </span>
          ) : null}
        </div>
      </div>
      <AddPersonToEventSelect
        key={addPersonKey}
        guests={guests}
        onChange={formik.setFieldValue}
      />
      <Button type="submit" className="w-full mt-5">
        Adicionar Evento
      </Button>
      {/* <pre>
        {JSON.stringify(formik.values, null, 2)}
        {JSON.stringify(formik.errors, null, 2)}
      </pre> */}
    </form>
  );
}

export default NewEventForm;
