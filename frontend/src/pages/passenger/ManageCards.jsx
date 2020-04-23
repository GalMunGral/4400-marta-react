import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Table from "../../components/Table";
import { UserContext } from "../../contexts";
import axios from "axios";

const ManageCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [value, setValue] = useState(0);
  const [newCardNumber, setNewCardNumber] = useState("");

  const columns = [
    { name: "BreezecardNum", displayName: "Card Number" },
    { name: "Value", displayName: "Value" },
  ];

  const loadCards = async () => {
    if (!user) return;
    const { data } = await axios.get("api/passenger/my-cards", {
      params: { user: user.username },
    });
    const { results, err } = data;
    if (results) setCards(results);
  };

  useEffect(() => {
    loadCards();
  }, [user]);

  useEffect(() => {
    if (selectedCard) {
      setSelectedCard(
        cards.find((c) => c.BreezecardNum === selectedCard.BreezecardNum)
      );
    }
  }, [cards]);

  const addCard = async () => {
    if (!/^[0-9]{16}$/.test(newCardNumber)) {
      alert("invalid card number");
      return;
    }
    try {
      await axios.post("/api/passenger/new-card", {
        username: user.username,
        newNumber: newCardNumber,
      });
      setNewCardNumber("");
      loadCards();
    } catch (e) {
      console.log(e);
      alert("error");
    }
  };

  const addValue = async () => {
    try {
      await axios.post("/api/passenger/add-value", {
        Number: selectedCard.BreezecardNum,
        Value: value,
      });
      setValue(0);
      loadCards();
    } catch (e) {
      console.log(e);
    }
  };

  const removeCard = async () => {
    try {
      await axios.post("/api/passenger/remove-card", {
        Username: user.username,
        Number: selectedCard,
      });
      loadCards();
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <header className="title is-1">Manage Cards</header>
        <section className="box">
          <div className="field is-grouped">
            <div className="control">
              <input
                className="input is-small"
                placeholder="New Card Number"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value)}
              />
            </div>
            <div className="control">
              <button
                className="button is-link is-small"
                type="button"
                onClick={addCard}
              >
                Add Card
              </button>
            </div>
            <div className="control">
              <input
                className="input is-small"
                type="number"
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-link is-small" onClick={addValue}>
                Add Value
              </button>
            </div>
          </div>
        </section>
        <Table
          className="column"
          columns={columns}
          data={cards}
          keyFn={(c) => c.BreezecardNum}
          selected={selectedCard}
          selectFn={setSelectedCard}
          actionEnabled
          actionName="Remove"
          actionFn={removeCard}
        />
      </div>
    </div>
  );
};
export default ManageCards;
