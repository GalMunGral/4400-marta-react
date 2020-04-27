import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Table, { Column } from "../../components/common/Table";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Card from "../../components/common/Card";
import Header from "../../components/common/Header";
import {
  GroupedFormField as Field,
  GroupedInput as Input,
  GroupedButton as Button,
} from "../../components/common/GroupedFormField";
import { formatCardNumber } from "../../utilities";
import useNotification from "../../hooks/Notification";

const ManageCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [value, setValue] = useState(0);
  const [newCardNumber, setNewCardNumber] = useState("");
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const loadCards = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("api/passenger/my-cards", {
        params: { user: user.username },
        cancelToken: source.token,
      });
      setCards(data);
    } catch (error) {
      notify("ERROR", "Failed to load cards");
    }
  };

  const addCard = async () => {
    if (!/^[0-9]{16}$/.test(newCardNumber)) {
      notify("ERROR", "Invalid card number");
      return;
    }
    try {
      await axios.post(
        "/api/passenger/new-card",
        {
          username: user.username,
          newNumber: newCardNumber,
        },
        { cancelToken: source.token }
      );
      setNewCardNumber("");
      await loadCards();
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to add card");
    }
  };

  const addValue = async () => {
    try {
      await axios.post(
        "/api/passenger/add-value",
        {
          breezecardNum: selectedCard.BreezecardNum,
          value,
        },
        { cancelToken: source.token }
      );
      setValue(0);
      await loadCards();
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to add value to card");
    }
  };

  const removeCard = async (card) => {
    try {
      await axios.post(
        "/api/passenger/remove-card",
        {
          username: user.username,
          breezecardNum: card.BreezecardNum,
        },
        { cancelToken: source.token }
      );
      await loadCards();
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Failed to remove card");
    }
  };

  useEffect(() => {
    loadCards();
    return () => source.cancel();
  }, []);

  useEffect(() => {
    if (selectedCard) {
      setSelectedCard(
        cards.find((c) => c.BreezecardNum === selectedCard.BreezecardNum)
      );
    }
  }, [cards]);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <Card>
        <Header>Manage Cards</Header>

        <Card sticky>
          <Field>
            <Input value={newCardNumber} onChange={setNewCardNumber} />
            <Button isLink isSmall onClick={addCard}>
              Add card
            </Button>
          </Field>
          <Field>
            <Input type="number" value={value} onChange={setValue} />
            <Button isLink isSmall onClick={addValue}>
              {selectedCard
                ? `Add value to ${formatCardNumber(selectedCard.BreezecardNum)}`
                : "(No card selected)"}
            </Button>
          </Field>
        </Card>

        <Table
          data={cards}
          keyFn={(c) => c.BreezecardNum}
          selected={selectedCard}
          selectFn={setSelectedCard}
          actionEnabled
          actionName="Remove"
          actionFn={removeCard}
        >
          <Column keyName="BreezecardNum">Card Number</Column>
          <Column keyName="Value" format="currency">
            Value
          </Column>
        </Table>
      </Card>
    </Container>
  );
};

export default ManageCards;
