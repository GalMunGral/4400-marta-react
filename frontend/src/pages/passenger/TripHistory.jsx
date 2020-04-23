import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table";
import { UserContext } from "../../contexts";
import { getDOMTimeString, getSQLTimeString } from "../../utilities";

const TripHistory = () => {
  const [user] = useContext(UserContext);
  const [tripHistory, setTripHistory] = useState([]);
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date());

  const fetchData = async () => {
    if (!user) return;
    const { data } = await axios.get("/api/passenger/trip-history", {
      params: {
        username: user.username,
        start: getSQLTimeString(startTime),
        end: getSQLTimeString(endTime),
        order: "DESC",
      },
    });
    const history = data.map((t) => ({
      ...t,
      Time: getSQLTimeString(new Date(t.Time)),
    }));
    setTripHistory(history);
  };

  useEffect(() => {
    fetchData();
  }, [startTime, endTime]);

  const columns = [
    { name: "Time", displayName: "Time" },
    { name: "SName", displayName: "Source" },
    { name: "DName", displayName: "Destination" },
    { name: "Fare", displayName: "Fare Paid" },
    { name: "BNumber", displayName: "Card#" },
  ];

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="column is-two-thirds">
        <header className="title is-1">Trip History</header>
        <form className="box">
          <div className="field is-grouped">
            <label className="label">Start Time: &nbsp;</label>
            <div className="control">
              <input
                className="input is-small"
                type="datetime-local"
                onChange={(e) => setStartTime(new Date(e.target.value))}
                value={getDOMTimeString(startTime)}
              />
            </div>
            <label className="label">End Time: &nbsp;</label>
            <div className="control">
              <input
                className="input is-small"
                type="datetime-local"
                onChange={(e) => setEndTime(new Date(e.target.value))}
                value={getDOMTimeString(endTime)}
              />
            </div>
            <div className="control">
              <button
                className="button is-link is-small"
                type="button"
                onClick={() => {
                  setStartTime(new Date(0));
                  setEndTime(new Date());
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        <Table columns={columns} data={tripHistory} keyFn={(t) => t.Time} />
      </div>
    </div>
  );
};

export default TripHistory;
