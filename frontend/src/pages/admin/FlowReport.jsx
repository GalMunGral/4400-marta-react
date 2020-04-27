import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { Table, Column } from "../../components/common/Table";
import Container from "../../components/common/Container";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { UserContext } from "../../contexts";
import { getSQLTimeString } from "../../utilities";
import useFilter from "../../hooks/FlowReportFilter";
import useNotification from "../../hooks/Notification";

const FlowReport = () => {
  const [user] = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [flowReportFilter, { startTime, endTime }] = useFilter();
  const notify = useNotification();

  const source = axios.CancelToken.source();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/flow-report", {
          params: {
            startTime: getSQLTimeString(startTime),
            endTime: getSQLTimeString(endTime),
          },
          cancelToken: source.token,
        });
        setReports(data);
      } catch (error) {
        notify("ERROR", "Failed to fetch flow reports");
      }
    })();
  }, [startTime, endTime]);

  useEffect(() => () => source.cancel(), []);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container medium>
      <Card>
        <Header>Passenger Flow Report</Header>

        {flowReportFilter}

        <Table data={reports} keyFn={(r, i) => i}>
          <Column keyName="Name" format="long">
            Station Name
          </Column>
          <Column keyName="InFlow">Inflow</Column>
          <Column keyName="OutFlow">Outflow</Column>
          <Column keyName="Flow">Net</Column>
          <Column keyName="Revenue" format="currency">
            Revenue
          </Column>
        </Table>
      </Card>
    </Container>
  );
};

export default FlowReport;
