import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table from "../../components/common/Table";
import { UserContext } from "../../contexts";
import StationDetail from "../../components/admin/StationDetail";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const Stations = () => {
  const [user] = useContext(UserContext);
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    const { data } = await axios.get("/api/stations");
    setStations(data);
  };

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

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container isWide>
      <header className="title is-1">All Stations</header>

      <Button isLink isLight onClick={createStation}>
        Create New Station
      </Button>

      <Table
        columns={[
          { name: "Name", displayName: "Station Name" },
          { name: "StopID", displayName: "Station ID" },
          { name: "EnterFare", displayName: "Fare" },
          { name: "ClosedStatus", displayName: "Status" },
        ]}
        data={stations}
        keyFn={(s) => s.StopID}
        selectFn={(s) => setSelected(s)}
      />

      {selected ? (
        <StationDetail
          selected={selected}
          setSelected={setSelected}
          loadStations={loadStations}
        />
      ) : null}
    </Container>
  );
};

export default Stations;
