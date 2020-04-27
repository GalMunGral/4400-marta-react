import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Modal from "../common/Modal";
import useNotification from "../../hooks/Notification";

const StationDetail = ({ selected: card, setSelected, fetchCards }) => {
  const [newValue, setNewValue] = useState(card.Value);
  const [newOwner, setNewOwner] = useState(card.BelongsTo);
  const notify = useNotification();
  const source = axios.CancelToken.source();

  const updateCardValue = async () => {
    try {
      await axios.post(
        "/api/admin/update-card-value",
        { breezecardNum: card.BreezecardNum, newValue },
        { cancelToken: source.token }
      );
      console.log("hey");
      await fetchCards();
      setSelected(null);
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to update card value");
    }
  };

  const updateCardOwner = async () => {
    try {
      await axios.post(
        "/api/admin/update-card-owner",
        {
          breezecardNum: card.BreezecardNum,
          newOwner,
        },
        { cancelToken: source.token }
      );
      await fetchCards();
      setSelected(null);
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to update card owner");
    }
  };

  useEffect(() => () => source.cancel(), []);

  useEffect(() => {
    setNewValue(card.Value);
    setNewOwner(card.BelongsTo);
  }, [card]);

  return (
    <Modal mount="#modal" closeFn={() => setSelected(null)}>
      <Input type="number" value={newValue} onChange={setNewValue} />
      <Button isLink onClick={updateCardValue}>
        Set Card Value
      </Button>

      <Input type="text" value={newOwner} onChange={setNewOwner} />
      <Button isLink onClick={updateCardOwner} disabled={!newOwner}>
        Transfer to User
      </Button>
    </Modal>
  );
};

export default StationDetail;
