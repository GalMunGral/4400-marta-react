import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getDOMTimeString, getSQLTimeString } from "../../utilities";
import axios from "axios";

const FlowReport = () => {
  const [reports, setReports] = useState([]);
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    fetchReports();
  }, [startTime, endTime]);

  const fetchReports = async () => {
    const { data } = await axios.get("/api/admin/flow-report", {
      params: {
        startTime: getSQLTimeString(startTime),
        endTime: getSQLTimeString(endTime),
      },
    });
    setReports(data);
  };

  const resetFilter = () => {
    setStartTime(new Date(0));
    setEndTime(new Date());
  };

  const columns = [
    { name: "Name", displayName: "Station Name" },
    { name: "InFlow", displayName: "In" },
    { name: "OutFlow", displayName: "Out" },
    { name: "Flow", displayName: "Flow" },
    { name: "Revenue", displayName: "Revenue" },
  ];

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <header className="title is-1">Passenger Flow Report</header>

        <form className="box">
          <div className="field is-grouped">
            <label className="label">Start:&nbsp;</label>
            <div className="control">
              <input
                className="input is-small"
                type="datetime-local"
                onChange={(e) => setStartTime(new Date(e.target.value))}
                value={getDOMTimeString(startTime)}
              />
            </div>
            <label className="label">End:&nbsp;</label>
            <div className="control">
              <input
                className="input is-small"
                type="datetime-local"
                onChange={(e) => setEndTime(new Date(e.target.value))}
                value={getDOMTimeString(endTime)}
              />
            </div>
            <div className="control">
              <button className="button is-link is-small" onClick={resetFilter}>
                Reset
              </button>
            </div>
          </div>
        </form>

        <Table columns={columns} data={reports} keyFn={(r) => r.Name} />
      </div>
    </div>
  );
};

export default FlowReport;
