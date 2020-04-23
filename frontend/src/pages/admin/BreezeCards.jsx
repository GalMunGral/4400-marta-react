import React, { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import Table from "../../components/Table";
import CardDetail from "../../components/CardDetail";
import useFilter from "../../hooks/BreezeCardFilter";
import { UserContext } from "../../contexts";

// This must live outside `BreezeCards` so that it could be updated by later invocations.
let filterParams = {};

const BreezeCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const columns = [
    { name: "BreezecardNum", displayName: "Card Number" },
    { name: "Value", displayName: "Value" },
    { name: "BelongsTo", displayName: "Username" },
  ];

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <header className="title is-1">Manage Breeze Cards</header>
        {filter}
        <Table
          columns={columns}
          data={cards}
          keyFn={(c) => c.BreezecardNum}
          selected={selected}
          selectFn={setSelected}
        />
      </div>

      {selected ? (
        <CardDetail
          selected={selected}
          setSelected={setSelected}
          fetchCards={fetchCards}
        />
      ) : null}
    </div>
  );
};

export default BreezeCards;
