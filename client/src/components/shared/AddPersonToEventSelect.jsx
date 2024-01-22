import { useState } from "react";
import Select from "react-select";



function AddPersonToEventSelect({options}) {
  const [selectedOption, setSelectedOption] = useState(null);
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
        options={options}
        isMulti
      />
    </div>
  );
}

export default AddPersonToEventSelect;
