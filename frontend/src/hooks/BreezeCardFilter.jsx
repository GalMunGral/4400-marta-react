import React, { useState } from "react";
import {
  GroupedInput,
  GroupedButton,
  GroupedFormField,
} from "../components/common/GroupedFormField";
import Card from "../components/common/Card";
import Form from "../components/common/Form";

const useFilter = () => {
  const [username, setUsername] = useState("");
  const [breezecardNum, setbreezecardNum] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10 ** 6);

  const resetFilter = () => {
    setUsername("");
    setbreezecardNum("");
    setMinValue(0);
    setMaxValue(10 ** 6);
  };

  const filterElement = (
    <Card sticky>
      <Form onReset={resetFilter}>
        <GroupedFormField>
          <GroupedInput value={username} onChange={setUsername}>
            Owner
          </GroupedInput>
        </GroupedFormField>

        <GroupedFormField>
          <GroupedInput value={breezecardNum} onChange={setbreezecardNum}>
            Card #
          </GroupedInput>
        </GroupedFormField>

        <GroupedFormField>
          <GroupedInput type="number" value={minValue} onChange={setMinValue}>
            Value between
          </GroupedInput>
          <GroupedInput type="number" value={maxValue} onChange={setMaxValue}>
            and
          </GroupedInput>
          <GroupedButton reset isLink isSmall>
            Reset
          </GroupedButton>
        </GroupedFormField>
      </Form>
    </Card>
  );

  return [filterElement, { username, breezecardNum, minValue, maxValue }];
};

export default useFilter;
