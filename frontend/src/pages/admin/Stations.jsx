import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table";
import { UserContext } from "../../contexts";
import StationDetail from "../../components/StationDetail";

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

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <header className="title is-1">All Stations</header>
        <button
          className="button is-link is-light is-pulled-right"
          onClick={initStation}
        >
          Create New Station
        </button>
        <Table
          columns={columns}
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
      </div>
    </div>
  );
};

export default Stations;
