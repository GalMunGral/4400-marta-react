import React, { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { debounce } from "lodash";
import Table, { Column } from "../../components/common/Table";
import CardDetail from "../../components/admin/CardDetail";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import useFilter from "../../hooks/BreezeCardFilter";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import useNotification from "../../hooks/Notification";

// This must live outside `BreezeCards` so it could be updated.
let filterParams = {};

const BreezeCards = () => {
  const [user] = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [
    breezecardFilter,
    { username, breezecardNum, minValue, maxValue },
  ] = useFilter();
  const notify = useNotification();

  filterParams = { username, breezecardNum, minValue, maxValue };

  const source = axios.CancelToken.source();

  // In order for `debounce` to work, we have to reuse the same function instance,
  // however the closure will be stale if `filterParams` lives in `BreeezeCards` scope.
  const fetchCards = useCallback(
    debounce(async () => {
      try {
        const { data } = await axios.get(
          "/api/admin/breeze-cards",
          {
            params: filterParams,
          },
          { cancelToken: source.token }
        );
        setCards(data);
      } catch (error) {
        notify("Error", "Failed to fetch cards");
      }
    }, 200),
    []
  );

  useEffect(() => () => source.cancel(), []);

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
    <Container medium>
      <Card>
        <Header>Manage Breeze Cards</Header>

        {breezecardFilter}

        <Table
          data={cards}
          keyFn={(c) => c.BreezecardNum}
          selected={selected}
          selectFn={setSelected}
        >
          <Column keyName="BreezecardNum">Card Number</Column>
          <Column keyName="Value">Value</Column>
          <Column keyName="BelongsTo">Username</Column>
        </Table>

        {selected ? (
          <CardDetail
            selected={selected}
            setSelected={setSelected}
            fetchCards={fetchCards}
          />
        ) : null}
      </Card>
    </Container>
  );
};

export default BreezeCards;
