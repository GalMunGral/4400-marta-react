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
    <form className="box">
      <div className="field is-grouped">
        <label className="label">Owner:&nbsp;</label>
        <div className="control">
          <input
            className="input is-small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <label className="label">Card Number:&nbsp;</label>
        <div className="control">
          <input
            className="input is-small"
            value={breezecardNum}
            onChange={(e) => setbreezecardNum(e.target.value)}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <label className="label">Value between&nbsp;</label>
        <div className="control">
          <input
            className="input is-small"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
        </div>
        <label className="label">and&nbsp;</label>
        <div className="control">
          <input
            className="input is-small"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </div>
      <div className="control">
        <button
          className="button is-link is-small"
          type="button"
          onClick={resetFilter}
        >
          Reset
        </button>
      </div>
    </form>
  );

  return [filter, { username, breezecardNum, minValue, maxValue }];
};

export default useFilter;
