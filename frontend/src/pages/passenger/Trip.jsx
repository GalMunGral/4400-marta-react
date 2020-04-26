import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import Select from "../../components/common/Select";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";

const Trip = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [stations, setStations] = useState([]);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [startTime, setStartTime] = useState(false);

  useEffect(() => {
    loadCards();
    loadStations();
  }, [user, startTime]);

  useEffect(() => {
    if (card) {
      setCard(cards.find((c) => c.BreezecardNum === card.BreezecardNum));
    }
  }, [cards]);

  const loadCards = async () => {
    if (!user) return;
    const { data } = await axios.get("/api/passenger/my-cards", {
      params: { user: user.username },
    });
    setCards(data);
  };

  const loadStations = async () => {
    if (!user) return;
    const { data } = await axios.get("/api/stations");
    setStations(data);
  };

  const startTrip = () => {
    if (+card.Value >= +startStation.EnterFare) {
      setStartTime(new Date());
    } else {
      alert("Insufficient funds");
    }
  };

  const endTrip = async () => {
    await axios.post("/api/passenger/complete-trip", {
      breezecardNum: card.BreezecardNum,
      currentFare: startStation.EnterFare,
      startTime: startTime.toISOString().replace("T", " ").replace(/\..*$/, ""),
      startID: startStation.StopID,
      endID: endStation.StopID,
    });
    setStartTime(null);
  };

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <div className="box">
        <header className="title is-1">New Trip</header>

        <form>
          <Select
            label={"Breeze Card"}
            onChange={(e) =>
              setCard(cards.find((c) => c.BreezecardNum === e.target.value))
            }
            value={card?.BreezecardNum}
            options={cards}
            keyFn={(c) => c.BreezecardNum}
            toString={(c) => String(c.BreezecardNum)}
            disabled={!!startTime}
          />

          <p className="has-text-primary is-italic has-text-weight-bold">
            Balance: ${(+card?.Value || 0).toFixed(2)}
          </p>

          <Select
            label={"Start At"}
            onChange={(e) =>
              setStartStation(stations.find((s) => s.StopID === e.target.value))
            }
            value={startStation?.StopID}
            keyFn={(s) => s.StopID}
            options={stations}
            toString={(s) => s.Name}
            disabled={!!startTime}
          />
          {card && !startTime ? (
            <div className="field">
              <div className="control">
                <button
                  className="button is-danger"
                  type="button"
                  onClick={startTrip}
                >
                  Start Trip
                </button>
              </div>
            </div>
          ) : null}

          {startTime ? (
            <section>
              <Select
                label={"End At"}
                onChange={(e) =>
                  setEndStation(
                    stations.find((s) => s.StopID === e.target.value)
                  )
                }
                value={endStation?.StopID}
                keyFn={(s) => s.StopID}
                options={stations}
                toString={(s) => s.Name}
                disabled={!startTime}
              />
              <div className="field">
                <div className="control">
                  <button
                    className="button is-danger"
                    type="button"
                    disabled={!startTime}
                    onClick={endTrip}
                  >
                    End Trip
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          <div
            className="field is-grouped is-grouped-right"
            style={{ marginTop: "2rem" }}
          ></div>
        </form>
      </div>
    </Container>
  );
};

export default Trip;
