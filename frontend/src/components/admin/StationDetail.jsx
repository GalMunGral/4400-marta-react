import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { Radio, Option } from "../common/Radio";
import Modal from "../common/Modal";
import Form from "../common/Form";
import useNotification from "../../hooks/Notification";

const StationDetail = ({ selected: station, setSelected, loadStations }) => {
  const [stopID, setStopID] = useState(station.StopID);
  const [name, setName] = useState(station.Name);
  const [enterFare, setEnterFare] = useState(station.EnterFare);
  const [isTrain, setIsTrain] = useState(station.IsTrain);
  const [intersection, setIntersection] = useState(station.Intersection);
  const [closedStatus, setClosedStatus] = useState(station.ClosedStatus);
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const updateFare = async () => {
    try {
      await axios.post(
        "/api/admin/update-fare",
        {
          enterFare,
          stopID,
        },
        { cancelToken: source.token }
      );
      await loadStations();
      setSelected(null);
      notify("INFO", "Success!");
    } catch {
      notify("ERROR", "Failed to update fare");
    }
  };

  const createStation = async () => {
    try {
      await axios.post(
        "/api/admin/create-station",
        {
          stopID,
          name,
          enterFare,
          isTrain,
          intersection,
          closedStatus,
        },
        { cancelToken: source.token }
      );
      setSelected(null);
      await loadStations();
      notify("INFO", "Success!");
    } catch {
      notify("ERROR", "Failed to create station");
    }
  };

  useEffect(() => () => source.cancel(), []);

  useEffect(() => {
    setStopID(station.StopID);
    setName(station.Name);
    setEnterFare(station.EnterFare);
    setIsTrain(station.IsTrain);
    setIntersection(station.Intersection);
    setClosedStatus(station.ClosedStatus);
  }, [station]);

  return (
    <Modal mount="#modal" closeFn={() => setSelected(null)}>
      <Form onSubmit={createStation}>
        <Input
          value={name}
          disabled={!station.isNew}
          onChange={setName}
          required
        >
          Station Name
        </Input>

        <Input
          value={stopID}
          disabled={!station.isNew}
          onChange={setStopID}
          required
        >
          ID
        </Input>

        <Input
          type="number"
          value={enterFare}
          onChange={(v) => setEnterFare(Math.max(0, v))}
          required
        >
          Fare
        </Input>

        {!station.isNew ? (
          <Button isLink isLight onClick={updateFare}>
            Update Fare
          </Button>
        ) : null}

        <Radio label="Station Type" disabled={!station.isNew} required>
          <Option checked={isTrain} onChange={() => setIsTrain(1)}>
            Train
          </Option>
          <Option checked={!isTrain} onChange={() => setIsTrain(0)}>
            Bus
          </Option>
        </Radio>

        <Input
          value={intersection}
          disabled={!station.isNew || isTrain}
          onChange={setIntersection}
        >
          Nearest Intersection
        </Input>

        <Checkbox
          checked={!closedStatus}
          disabled={!station.isNew}
          onChange={(v) => setClosedStatus(v ? 0 : 1)}
          required
        >
          Open (Passengers can enter at this station)
        </Checkbox>

        {station.isNew ? (
          <Button submit isLink>
            Confirm
          </Button>
        ) : null}
      </Form>
    </Modal>
  );
};

export default StationDetail;
