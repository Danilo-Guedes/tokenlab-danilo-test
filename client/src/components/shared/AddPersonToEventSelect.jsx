import { prepareGuestDataForSelect } from "@/src/utils/functions";
import { useState, useEffect } from "react";
import Select from "react-select";

function AddPersonToEventSelect({ guests, onChange, initialValue }) {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
    if (!selectedOption) return;
    onChange('guests',selectedOption);
  }, [selectedOption, onChange]);

  return (
    <div className="flex flex-col  w-full  gap-5">
      <label
        htmlFor="add-person-to-event"
        className="text-lg text-secondary font-bold  text-left"
      >
        Selecione as pessoas para o evento
      </label>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={prepareGuestDataForSelect(guests)}
        isMulti
        noOptionsMessage={() => "Nenhum usuário encontrado"}
        placeholder="Selecione..."
      />
    </div>
  );
}

export default AddPersonToEventSelect;
