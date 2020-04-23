import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/Table";
import useFilter from "../../hooks/BreezeCardFilter";
import axios from "axios";
import { debounce } from "lodash";

// This must live outside `BreezeCards` so that it could be updated by later invocations.
let filterParams = {};

const BreezeCards = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newValue, setNewValue] = useState(0);
  const [newOwner, setNewOwner] = useState("");

  const [filter, { username, breezecardNum, minValue, maxValue }] = useFilter();
  filterParams = { username, breezecardNum, minValue, maxValue };

  const fetchCards = useCallback(
    debounce(async () => {
      const { data } = await axios.get("/api/admin/breeze-cards", {
        params: filterParams,
      });
      setCards(data);
    }, 200),
    []
  );

  useEffect(() => {
    fetchCards();
  }, [username, breezecardNum, minValue, maxValue]);

  useEffect(() => {
    if (selected) {
      setSelected(
        cards.find((c) => c.BreezecardNum === selected.BreezecardNum)
      );
    }
  }, [cards]);

  const updateCardValue = async () => {
    await axios.post("/api/admin/update-card-value", {
      breezecardNum: selected.BreezecardNum,
      newValue,
    });
    await fetchCards();
    setNewValue(0);
  };

  const updateCardOwner = async () => {
    await axios.post("/api/admin/update-card-owner", {
      breezecardNum: selected.BreezecardNum,
      newOwner,
    });
    await fetchCards();
    setNewOwner("");
  };

  const columns = [
    { name: "BreezecardNum", displayName: "Card Number" },
    { name: "Value", displayName: "Value" },
    { name: "BelongsTo", displayName: "Username" },
  ];

  return (
    <React.Fragment>
      <header>Manage Breeze Cards</header>

      {filter}

      <Table
        columns={columns}
        data={cards}
        keyFn={(c) => c.BreezecardNum}
        selected={selected}
        selectFn={setSelected}
      />

      <form>
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <input
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
        />
      </form>

      <div>
        <button onClick={updateCardValue} disabled={!newValue}>
          Set Value of Selected Card
        </button>
        <button onClick={updateCardOwner} disabled={!newOwner}>
          Transfer Selected Card
        </button>
      </div>
    </React.Fragment>
  );
};

export default BreezeCards;
