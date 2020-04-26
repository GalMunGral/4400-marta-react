import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { Radio, Option } from "../common/Radio";
import Modal from "../common/Modal";

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

  return (
    <Modal mount="#modal" closeFn={() => setSelected(null)}>
      <form onSubmit={(e) => createStation(e)}>
        <Input
          value={name}
          disabled={!station.isNew}
          onChange={(e) => setName(e.target.value)}
        >
          Station Name
        </Input>

        <Input
          value={stopID}
          disabled={!station.isNew}
          onChange={(e) => setStopID(e.target.value)}
        >
          ID
        </Input>

        <Input
          type="number"
          value={enterFare}
          onChange={(e) => setEnterFare(Math.max(0, e.target.value))}
        >
          Fare
        </Input>

        {!station.isNew ? (
          <Button isLink isLight onClick={updateFare}>
            Update Fare
          </Button>
        ) : null}

        <Radio label="Station Type" disabled={!station.isNew}>
          <Option checked={isTrain} onChange={() => setIsTrain(1)}>
            Train
          </Option>
          <Option checked={!isTrain} onChange={() => setIsTrain(0)}>
            Buts
          </Option>
        </Radio>

        <Input
          value={intersection}
          disabled={!station.isNew || isTrain}
          onChange={(e) => setIntersection(e.target.value)}
        >
          Nearest Intersection
        </Input>

        <Checkbox
          checked={!closedStatus}
          disabled={!station.isNew}
          onChange={(e) => setClosedStatus(e.target.checked ? 0 : 1)}
        >
          Open (Passengers can enter at this station)
        </Checkbox>

        {station.isNew ? (
          <Button submit isLink>
            Confirm
          </Button>
        ) : null}
      </form>
    </Modal>
  );
};

export default StationDetail;
