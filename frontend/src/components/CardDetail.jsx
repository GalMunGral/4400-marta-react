import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

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

  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setSelected(null)}></div>
      <div className="modal-content box">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" onClick={updateCardValue}>
              Set Card Value
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              value={newOwner || ""}
              onChange={(e) => setNewOwner(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-link"
              onClick={updateCardOwner}
              disabled={!newOwner}
            >
              Transfer to User
            </button>
          </div>
        </div>
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
