import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table from "../../components/common/Table";
import Container from "../../components/common/Container";
import { UserContext } from "../../contexts";
import { getSQLTimeString } from "../../utilities";
import useFilter from "../../hooks/FlowReportFilter";

const FlowReport = () => {
  const [user] = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [flowReportFilter, { startTime, endTime }] = useFilter();

  const source = axios.CancelToken.source();

  useEffect(() => {
    axios
      .get("/api/admin/flow-report", {
        cancelToken: source.token,
        params: {
          startTime: getSQLTimeString(startTime),
          endTime: getSQLTimeString(endTime),
        },
      })
      .then(({ data }) => setReports(data), console.warn);

    return () => source.cancel();
  }, [startTime, endTime]);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container isWide>
      <header className="title is-1">Passenger Flow Report</header>

      {flowReportFilter}

      <Table
        columns={[
          { name: "Name", displayName: "Station Name" },
          { name: "InFlow", displayName: "In" },
          { name: "OutFlow", displayName: "Out" },
          { name: "Flow", displayName: "Flow" },
          { name: "Revenue", displayName: "Revenue" },
        ]}
        data={reports}
        keyFn={(r) => r.Name}
      />
    </Container>
  );
};

export default FlowReport;
