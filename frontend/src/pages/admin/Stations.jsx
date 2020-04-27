import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table, { Column } from "../../components/common/Table";
import { UserContext } from "../../contexts";
import StationDetail from "../../components/admin/StationDetail";
import Container from "../../components/common/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import useNotification from "../../hooks/Notification";

const Stations = () => {
  const [user] = useContext(UserContext);
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);
  const notify = useNotification();

  const createStation = () => {
    setSelected({
      isNew: true,
      StopID: "",
      Name: "",
      EnterFare: 0,
      IsTrain: 0,
      Intersection: "",
      ClosedStatus: 0,
    });
  };

  const source = axios.CancelToken.source();

  const loadStations = async () => {
    try {
      const { data } = await axios.get("/api/stations", {
        cancelToken: source.token,
      });
      setStations(data);
    } catch (error) {
      notify("ERROR", "Failed to fetch stations");
    }
  };

  useEffect(() => {
    loadStations();
    return () => source.cancel();
  }, []);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container medium>
      <Card>
        <Header>All Stations</Header>
        <Button isLink isLight onClick={createStation}>
          Create New Station
        </Button>

        <Table
          data={stations}
          keyFn={(s) => s.StopID}
          selected={selected}
          selectFn={setSelected}
        >
          <Column keyName="StopID">Station ID</Column>
          <Column keyName="Name" format="long">
            Station Name
          </Column>
          <Column keyName="EnterFare" format="currency">
            Fare
          </Column>
          <Column keyName="ClosedStatus" format="bool">
            Closed
          </Column>
        </Table>

        {selected ? (
          <StationDetail {...{ selected, setSelected, loadStations }} />
        ) : null}
      </Card>
    </Container>
  );
};

export default Stations;
