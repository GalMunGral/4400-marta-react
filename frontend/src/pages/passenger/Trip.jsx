import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { Select, Option, Label } from "../../components/common/Select";
import Card from "../../components/common/Card";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Header from "../../components/common/Header";
import Form from "../../components/common/Form";
import { Text, Format } from "../../components/common/Text";
import Button from "../../components/common/Button";
import useNotification from "../../hooks/Notification";

const Trip = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [stations, setStations] = useState([]);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [startTime, setStartTime] = useState(false);
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const loadCards = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/api/passenger/my-cards", {
        params: { user: user.username },
        cancelToken: source.token,
      });
      setCards(data);
    } catch (error) {
      notify("ERROR", "Failed to load cards");
    }
  };

  const loadStations = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/api/stations", {
        cancelToken: source.token,
      });
      setStations(data);
    } catch {
      notify("ERROR", "Failed to load stations");
    }
  };

  const startTrip = () => {
    if (+card.Value >= +startStation.EnterFare) {
      setStartTime(new Date());
      notify("INFO", "Trip started!");
    } else {
      notify("ERROR", "Insufficient funds");
    }
  };

  const endTrip = async () => {
    try {
      await axios.post(
        "/api/passenger/complete-trip",
        {
          breezecardNum: card.BreezecardNum,
          currentFare: startStation.EnterFare,
          startTime: startTime
            .toISOString()
            .replace("T", " ")
            .replace(/\..*$/, ""),
          startID: startStation.StopID,
          endID: endStation.StopID,
        },
        { cancelToken: source.token }
      );
      setStartStation(endStation);
      setStartTime(null);
      notify("INFO", "Trip completed. Thanks for choosing MARTA!");
    } catch (error) {
      console.log(error);
      notify("ERROR", "Failed to end trip");
    }
  };

  useEffect(() => () => source.cancel(), []);

  // Needs to update card balance when trip ends, i.e. when `startTime` is reset
  useEffect(() => {
    loadCards();
    loadStations();
  }, [user, startTime]);

  useEffect(() => {
    if (card) {
      setCard(cards.find((c) => c.BreezecardNum === card.BreezecardNum));
    }
  }, [cards]);

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <Card>
        <Header>New Trip</Header>

        <Form>
          <Select value={card} disabled={!!startTime} onChange={setCard}>
            <Label>Select Breeze card</Label>
            <Option forEach={cards} keyFn={(c) => c.BreezecardNum}>
              {(c) => c.BreezecardNum}
            </Option>
          </Select>

          <Text>
            Balance: <Format type="currency">{card?.Value}</Format>
          </Text>

          <Select
            onChange={setStartStation}
            value={startStation}
            disabled={!!startTime}
          >
            <Label>I'm currently at</Label>
            <Option forEach={stations} keyFn={(s) => s.StopID}>
              {(s) => s.Name}
            </Option>
          </Select>

          {card && !startTime ? (
            <Button isDanger onClick={startTrip}>
              Start Trip
            </Button>
          ) : null}

          {startTime ? (
            <>
              <Select
                onChange={setEndStation}
                value={endStation}
                disabled={!startTime}
              >
                <Label>I'm going to</Label>
                <Option forEach={stations} keyFn={(s) => s.StopID}>
                  {(s) => s.Name}
                </Option>
              </Select>

              <Button isDanger disabled={!startTime} onClick={endTrip}>
                End Trip
              </Button>
            </>
          ) : null}
        </Form>
      </Card>
    </Container>
  );
};

export default Trip;
