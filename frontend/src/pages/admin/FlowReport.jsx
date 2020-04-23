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
    <React.Fragment>
      <header>Passenger Flow Report</header>

      <form>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setStartTime(new Date(e.target.value))}
            value={getDOMTimeString(startTime)}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setEndTime(new Date(e.target.value))}
            value={getDOMTimeString(endTime)}
          />
        </div>
        <button onClick={resetFilter}>Reset</button>
      </form>

      <Table columns={columns} data={reports} keyFn={(r) => r.Name} />
    </React.Fragment>
  );
};

export default FlowReport;
