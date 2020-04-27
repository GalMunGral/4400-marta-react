import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table, { Column } from "../../components/common/Table";
import Card from "../../components/common/Card";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import useNotification from "../../hooks/Notification";

const SuspendedCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const loadSuspendedCards = async () => {
    try {
      const { data } = await axios.get("/api/admin/suspended-cards", {
        cancelToken: source.token,
      });
      setCards(data);
    } catch (error) {
      notify("ERROR", "Failed to load suspended cards");
    }
  };

  const assign = async (shouldAssignToNewUser) => {
    try {
      await axios.post(
        "/api/admin/resolve-conflict",
        {
          shouldAssignToNewUser,
          breezecardNum: selected.BreezecardNum,
          username: shouldAssignToNewUser
            ? selected.Username
            : selected.BelongsTo,
        },
        { cancelToken: source.token }
      );
      await loadSuspendedCards();
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to assign card to new user");
    }
  };

  useEffect(() => {
    loadSuspendedCards();
    return () => source.cancel();
  }, []);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container medium>
      <Card>
        <Header>Suspended Cards</Header>

        <Table
          data={cards}
          keyFn={(c) => c.BreezecardNum + c.Username}
          selected={selected}
          selectFn={setSelected}
        >
          <Column keyName="BreezecardNum">Card Number</Column>
          <Column keyName="Username">New Owner</Column>
          <Column keyName="DateTime" format="time">
            Suspension Date
          </Column>
          <Column keyName="BelongsTo">Previous Owner</Column>
        </Table>

        <Button isDanger isLight onClick={() => assign(true)}>
          Assign Selected Card to New Owner
        </Button>

        <Button isLink isLight onClick={() => assign(false)}>
          Assign Selected Card to Previous Owner
        </Button>
      </Card>
    </Container>
  );
};

export default SuspendedCards;
