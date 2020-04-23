import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const StationDetail = ({ selected: station, setSelected, loadStations }) => {
  const [stopID, setStopID] = useState(station.StopID);
  const [name, setName] = useState(station.Name);
  const [enterFare, setEnterFare] = useState(station.EnterFare);
  const [isTrain, setIsTrain] = useState(station.IsTrain);
  const [intersection, setIntersection] = useState(station.Intersection);
  const [closedStatus, setClosedStatus] = useState(station.ClosedStatus);

  useEffect(() => {
    setStopID(station.StopID);
    setName(station.Name);
    setEnterFare(station.EnterFare);
    setIsTrain(station.IsTrain);
    setIntersection(station.Intersection);
    setClosedStatus(station.ClosedStatus);
  }, [station]);

  const updateFare = async () => {
    await axios.post("/api/admin/update-fare", {
      enterFare,
      stopID,
    });
    await loadStations();
  };

  const createStation = async (e) => {
    e.preventDefault();
    await axios.post("/api/admin/create-station", {
      stopID,
      name,
      enterFare,
      isTrain,
      intersection,
      closedStatus,
    });
    setSelected(null);
    await loadStations();
  };

  return ReactDOM.createPortal(
    <div>
      <button onClick={() => setSelected(null)}>Close</button>
      <form onSubmit={(e) => createStation(e)}>
        Station Detail -
        <input
          value={name}
          disabled={!station.isNew}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <label>ID</label>
          <input
            value={stopID}
            disabled={!station.isNew}
            onChange={(e) => setStopID(e.target.value)}
          />
        </div>
        <div>
          <label>Fare</label>
          <input
            type="number"
            value={enterFare}
            onChange={(e) => setEnterFare(Math.max(0, e.target.value))}
          />
        </div>
        <div>
          {!station.isNew ? (
            <button type="button" onClick={updateFare}>
              Update Fare
            </button>
          ) : null}
        </div>
        <div>
          <label>Station Type</label>
          <div>
            <input
              type="radio"
              name="stationType"
              disabled={!station.isNew}
              checked={isTrain}
              onClick={() => setIsTrain(1)}
            />
            <label>Train</label>
          </div>
          <div>
            <input
              type="radio"
              name="stationType"
              disabled={!station.isNew}
              checked={!isTrain}
              onClick={() => setIsTrain(0)}
            />
            <label>Bus</label>
          </div>
        </div>
        <div>
          <label>Nearest Intersection</label>
          <input
            type="text"
            value={intersection || ""}
            disabled={!station.isNew || isTrain}
            placeholder="Not available"
            onChange={(e) => setIntersection(e.target.value)}
          />
        </div>
        <div>
          <label>
            Open (When checked, passengers can enter at this station)
          </label>
          <input
            type="checkbox"
            checked={!closedStatus}
            disabled={!station.isNew}
            onChange={(e) => setClosedStatus(e.target.checked ? 0 : 1)}
          />
        </div>
        {station.isNew ? <button>Confirm</button> : null}
      </form>
    </div>,
    document.querySelector("#modal")
  );
};

export default StationDetail;
