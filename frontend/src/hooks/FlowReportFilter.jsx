import React, { useState } from "react";
import { getDOMTimeString } from "../utilities";
import {
  GroupedFormField,
  GroupedInput,
  GroupedButton,
} from "../components/common/GroupedFormField";

const useFilter = () => {
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date());

  const resetFilter = () => {
    setStartTime(new Date(0));
    setEndTime(new Date());
  };

  const filterElement = (
    <form className="box" onReset={resetFilter}>
      <GroupedFormField>
        <GroupedInput
          type="datetime-local"
          onChange={(e) => setStartTime(new Date(e.target.value))}
          value={getDOMTimeString(startTime)}
        >
          Start
        </GroupedInput>
        <GroupedInput
          type="datetime-local"
          onChange={(e) => setEndTime(new Date(e.target.value))}
          value={getDOMTimeString(endTime)}
        >
          End
        </GroupedInput>
        <GroupedButton reset isLink isSmall>
          Reset
        </GroupedButton>
      </GroupedFormField>
    </form>
  );

  return [filterElement, { startTime, setStartTime, endTime, setEndTime }];
};

export default useFilter;
