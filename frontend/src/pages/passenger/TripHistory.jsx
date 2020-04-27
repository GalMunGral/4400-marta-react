import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { Table, Column } from "../../components/common/Table";
import { UserContext } from "../../contexts";
import { getDOMTimeString, getSQLTimeString } from "../../utilities";
import Container from "../../components/common/Container";
import Header from "../../components/common/Header";
import Form from "../../components/common/Form";
import Card from "../../components/common/Card";
import {
  GroupedFormField as Field,
  GroupedButton as Button,
  GroupedInput as Input,
} from "../../components/common/GroupedFormField";
import useNotification from "../../hooks/Notification";

const TripHistory = () => {
  const [user] = useContext(UserContext);
  const [tripHistory, setTripHistory] = useState([]);
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date());
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const fetchTripHistory = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/api/passenger/trip-history", {
        params: {
          username: user.username,
          start: getSQLTimeString(startTime),
          end: getSQLTimeString(endTime),
          order: "DESC",
        },
        cancelToken: source.token,
      });
      const history = data.map((t) => ({
        ...t,
        Time: getSQLTimeString(new Date(t.Time)),
      }));
      setTripHistory(history);
    } catch (error) {
      notify("ERROR", "Failed to load trip history");
    }
  };

  useEffect(() => () => source.cancel(), []);

  useEffect(() => {
    fetchTripHistory();
  }, [startTime, endTime]);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container wide>
      <Card>
        <Header>Trip History</Header>

        <Card sticky>
          <Form>
            <Field>
              <Input
                type="datetime-local"
                onChange={(v) => setStartTime(new Date(v))}
                value={getDOMTimeString(startTime)}
              >
                Start Time
              </Input>
              <Input
                type="datetime-local"
                onChange={(v) => setEndTime(new Date(v))}
                value={getDOMTimeString(endTime)}
              >
                End Time
              </Input>
              <Button
                isLink
                isSmall
                onClick={() => {
                  setStartTime(new Date(0));
                  setEndTime(new Date());
                }}
              >
                Reset
              </Button>
            </Field>
          </Form>
        </Card>

        <Table data={tripHistory} keyFn={(t) => t.Time}>
          <Column keyName="Time" format="time">
            Time
          </Column>
          <Column keyName="SName" format="long">
            Source
          </Column>
          <Column keyName="DName" format="long">
            Destination
          </Column>
          <Column keyName="Fare" format="currency">
            Fare Paid
          </Column>
          <Column keyName="BNumber">Card #</Column>
        </Table>
      </Card>
    </Container>
  );
};

export default TripHistory;
