import React, { useState } from "react";
import { getDOMTimeString } from "../utilities";
import {
  GroupedFormField,
  GroupedInput,
  GroupedButton,
} from "../components/common/GroupedFormField";
import Form from "../components/common/Form";
import Card from "../components/common/Card";

const useFilter = () => {
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date());

  const resetFilter = () => {
    setStartTime(new Date(0));
    setEndTime(new Date());
  };

  const filterElement = (
    <Card sticky>
      <Form onReset={resetFilter}>
        <GroupedFormField>
          <GroupedInput
            type="datetime-local"
            onChange={(v) => setStartTime(new Date(v))}
            value={getDOMTimeString(startTime)}
          >
            Start
          </GroupedInput>
          <GroupedInput
            type="datetime-local"
            onChange={(v) => setEndTime(new Date(v))}
            value={getDOMTimeString(endTime)}
          >
            End
          </GroupedInput>
          <GroupedButton reset isLink isSmall>
            Reset
          </GroupedButton>
        </GroupedFormField>
      </Form>
    </Card>
  );

  return [filterElement, { startTime, endTime, setStartTime, setEndTime }];
};

export default useFilter;
