import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

const SuspendedCards = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadSuspendedCards();
  }, []);

  const loadSuspendedCards = async () => {
    const { data } = await axios.get("/api/admin/suspended-cards");
    setCards(data);
  };

  const assign = async (shouldAssignToNewUser) => {
    await axios.post("/api/admin/resolve-conflict", {
      shouldAssignToNewUser,
      breezecardNum: selected.BreezecardNum,
      username: shouldAssignToNewUser ? selected.Username : selected.BelongsTo,
    });
    await loadSuspendedCards();
  };

  const columns = [
    { name: "BreezecardNum", displayName: "Card Number" },
    { name: "Username", displayName: "New Owner" },
    { name: "DateTime", displayName: "Suspension Date" },
    { name: "BelongsTo", displayName: "Previous Owner" },
  ];

  return (
    <div className="columns is-centered">
      <div className="colums is-one-third">
        <div className="box">
          <header className="title is-1">Suspended Cards</header>
          <Table
            columns={columns}
            data={cards}
            keyFn={(c) => c.BreezecardNum + c.Username}
            selected={selected}
            selectFn={setSelected}
          />
          <div className="field">
            <div className="control">
              <button
                className="button is-danger is-light"
                onClick={() => assign(true)}
              >
                Assign Selected Card to New Owner
              </button>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={() => assign(false)}
              >
                Assign Selected Card to Previous Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendedCards;
