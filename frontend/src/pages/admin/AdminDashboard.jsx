import React, { useContext } from "react";
import { Link, Redirect } from "@reach/router";
import Container from "../../components/common/Container";
import { UserContext } from "../../contexts";
import Panel from "../../components/common/Panel";

const AdminDashboard = () => {
  const [user] = useContext(UserContext);

  const routes = [
    { name: "Station Management", path: "/stations" },
    { name: "Suspended Cards", path: "/suspended-cards" },
    { name: "Breeze Card Management", path: "/breeze-cards" },
    { name: "Passenger Flow Report", path: "/passenger-flow" },
  ];

  if (!user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <Panel title="Administrator">
        {routes.map((route) => (
          <Link to={route.path} key={route.path}>
            {route.name}
          </Link>
        ))}
      </Panel>
    </Container>
  );
};

export default AdminDashboard;
