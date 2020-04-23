import React, { useState, useContext, useEffect } from "react";
import Table from "../../components/Table";
import { UserContext } from "../../contexts";
import axios from "axios";
import { useHistory } from "react-router";
import StationDetail from "./StationDetail";

const Stations = () => {
  const [user] = useContext(UserContext);
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);
  const history = useHistory();

  useEffect(() => {
    loadStations();
  }, [user]);

  const loadStations = async () => {
    if (!user) return;
    const { data } = await axios.get("/api/stations");
    const { results } = data;
    if (results) setStations(results);
  };

  const initStation = () => {
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

  const columns = [
    { name: "Name", displayName: "Station Name" },
    { name: "StopID", displayName: "Station ID" },
    { name: "EnterFare", displayName: "Fare" },
    { name: "ClosedStatus", displayName: "Status" },
  ];

  return (
    <React.Fragment>
      <header>Station Listing</header>
      <Table
        columns={columns}
        data={stations}
        keyFn={(s) => s.StopID}
        selectFn={(s) => setSelected(s)}
      />
      <button onClick={initStation}>Create New Station</button>
      {selected ? (
        <StationDetail
          selected={selected}
          setSelected={setSelected}
          loadStations={loadStations}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Stations;
