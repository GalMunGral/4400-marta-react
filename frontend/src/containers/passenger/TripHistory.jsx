import React, { useEffect, useState, useContext } from "react";
import TableTemplate from "../../components/TableTemplate";
import axios from "axios";
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

  return (
    <React.Fragment>
      <header>TripHistory</header>
      <form>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setStartTime(new Date(e.target.value))}
            value={getDOMTimeString(startTime)}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setEndTime(new Date(e.target.value))}
            value={getDOMTimeString(endTime)}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setStartTime(new Date(0));
            setEndTime(new Date());
          }}
        >
          Reset
        </button>
      </form>
      <TableTemplate
        columns={columns}
        data={tripHistory}
        keyFn={(t) => t.Time}
      />
    </React.Fragment>
  );
};

export default TripHistory;
