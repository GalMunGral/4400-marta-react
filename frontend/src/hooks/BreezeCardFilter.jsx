import React, { useState } from "react";

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

  const filter = (
    <form>
      <div>
        <label>Owner</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Card Number</label>
        <input
          value={breezecardNum}
          onChange={(e) => setbreezecardNum(e.target.value)}
        />
      </div>
      <div>
        <label>Value between</label>
        <input
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
        />
        <label>and</label>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        />
      </div>
      <button type="button" onClick={resetFilter}>
        Reset
      </button>
    </form>
  );

  return [
    filter,
    {
      username,
      breezecardNum,
      minValue,
      maxValue,
    },
  ];
};

export default useFilter;
