import React, { useState } from "react";
import {
  GroupedInput,
  GroupedButton,
  GroupedFormField,
} from "../components/common/GroupedFormField";

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
    <form className="box">
      <GroupedFormField>
        <GroupedInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          Owner
        </GroupedInput>
      </GroupedFormField>

      <GroupedFormField>
        <GroupedInput
          value={breezecardNum}
          onChange={(e) => setbreezecardNum(e.target.value)}
        >
          Card Number
        </GroupedInput>
      </GroupedFormField>

      <GroupedFormField>
        <GroupedInput
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
        >
          Value between
        </GroupedInput>
        <GroupedInput
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        >
          and
        </GroupedInput>
        <GroupedButton isLink onClick={resetFilter} isSmall>
          Reset
        </GroupedButton>
      </GroupedFormField>
    </form>
  );

  return [filterElement, { username, breezecardNum, minValue, maxValue }];
};

export default useFilter;
