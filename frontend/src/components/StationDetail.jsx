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
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setSelected(null)}></div>
      <div className="modal-content box">
        <form onSubmit={(e) => createStation(e)}>
          <div className="field">
            <label className="label">Station Name</label>
            <div className="control">
              <input
                className="input"
                value={name}
                disabled={!station.isNew}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ID</label>
            <div className="control">
              <input
                className="input"
                value={stopID}
                disabled={!station.isNew}
                onChange={(e) => setStopID(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Fare</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={enterFare}
                onChange={(e) => setEnterFare(Math.max(0, e.target.value))}
              />
            </div>
          </div>
          {!station.isNew ? (
            <div className="field">
              <div className="control">
                <button
                  className="button is-link is-light"
                  type="button"
                  onClick={updateFare}
                >
                  Update Fare
                </button>
              </div>
            </div>
          ) : null}
          <div className="field">
            <label className="label">Station Type</label>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="stationType"
                  disabled={!station.isNew}
                  checked={isTrain}
                  onClick={() => setIsTrain(1)}
                />
                &nbsp;Train
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="stationType"
                  disabled={!station.isNew}
                  checked={!isTrain}
                  onClick={() => setIsTrain(0)}
                />
                &nbsp;Bus
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Nearest Intersection</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={intersection || ""}
                disabled={!station.isNew || isTrain}
                onChange={(e) => setIntersection(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={!closedStatus}
                  disabled={!station.isNew}
                  onChange={(e) => setClosedStatus(e.target.checked ? 0 : 1)}
                />
                &nbsp;Open (Passengers can enter at this station)
              </label>
            </div>
          </div>
          {station.isNew ? (
            <div className="field">
              <div className="control">
                <button className="button is-link">Confirm</button>
              </div>
            </div>
          ) : null}
        </form>
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setSelected(null)}
      >
        Close
      </button>
    </div>,
    document.querySelector("#modal")
  );
};

export default StationDetail;
