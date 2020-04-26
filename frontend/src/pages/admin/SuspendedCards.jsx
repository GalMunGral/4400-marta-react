import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table from "../../components/common/Table";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const SuspendedCards = () => {
  const [user] = useContext(UserContext);
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

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container isWide>
      <div className="box">
        <header className="title is-1">Suspended Cards</header>

        <Table
          columns={columns}
          data={cards}
          keyFn={(c) => c.BreezecardNum + c.Username}
          selected={selected}
          selectFn={setSelected}
        />

        <Button isDanger isLight onClick={() => assign(true)}>
          Assign Selected Card to New Owner
        </Button>

        <Button isLink isLight onClick={() => assign(false)}>
          Assign Selected Card to Previous Owner
        </Button>
      </div>
    </Container>
  );
};

export default SuspendedCards;
