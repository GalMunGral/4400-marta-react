import React, { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { debounce } from "lodash";
import Table from "../../components/common/Table";
import CardDetail from "../../components/admin/CardDetail";
import useFilter from "../../hooks/BreezeCardFilter";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";

// This must live outside `BreezeCards` so that it could be updated by later invocations.
let filterParams = {};

const BreezeCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);

  const [
    breezecardFilter,
    { username, breezecardNum, minValue, maxValue },
  ] = useFilter();
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

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container isWide>
      <header className="title is-1">Manage Breeze Cards</header>

      {breezecardFilter}

      <Table
        columns={[
          { name: "BreezecardNum", displayName: "Card Number" },
          { name: "Value", displayName: "Value" },
          { name: "BelongsTo", displayName: "Username" },
        ]}
        data={cards}
        keyFn={(c) => c.BreezecardNum}
        selected={selected}
        selectFn={setSelected}
      />

      {selected ? (
        <CardDetail
          selected={selected}
          setSelected={setSelected}
          fetchCards={fetchCards}
        />
      ) : null}
    </Container>
  );
};

export default BreezeCards;
