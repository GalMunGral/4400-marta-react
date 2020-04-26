import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Modal from "../common/Modal";

const StationDetail = ({ selected: card, setSelected, fetchCards }) => {
  const [newValue, setNewValue] = useState(card.Value);
  const [newOwner, setNewOwner] = useState(card.BelongsTo);

  useEffect(() => {
    setNewValue(card.Value);
    setNewOwner(card.BelongsTo);
  }, [card]);

  const updateCardValue = async () => {
    await axios.post("/api/admin/update-card-value", {
      breezecardNum: card.BreezecardNum,
      newValue,
    });
    await fetchCards();
    setSelected(null);
  };

  const updateCardOwner = async () => {
    try {
      await axios.post("/api/admin/update-card-owner", {
        breezecardNum: card.BreezecardNum,
        newOwner,
      });
      await fetchCards();
      setSelected(null);
    } catch (e) {
      alert("Failed to update card owner");
    }
  };

  return (
    <Modal mount="#modal" closeFn={() => setSelected(null)}>
      <Input
        type="number"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />

      <Button isLink onClick={updateCardValue}>
        Set Card Value
      </Button>

      <Input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />

      <Button isLink onClick={updateCardOwner} disabled={!newOwner}>
        Transfer to User
      </Button>
    </Modal>
  );
};

export default StationDetail;
