import React, { useState, useContext } from "react";
import { Redirect, useNavigate } from "@reach/router";
import axios from "axios";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Input from "../../components/common/Input";
import {
  GroupedFormField,
  GroupedButton,
} from "../../components/common/GroupedFormField";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const {
      data: { success, userType },
    } = await axios.post(`/api/auth/login`, {
      username,
      password,
    });
    if (success) {
      setUser({ username, userType });
    } else {
      alert("failed");
    }
  };

  if (user) {
    const landingPage =
      user.userType === "ADMIN" ? "/admin-dashboard" : "/my-trip";
    return <Redirect to={landingPage} noThrow />;
  }

  return (
    <Container>
      <div className="box">
        <header className="title is-1">Login</header>
        <form onSubmit={login}>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            Username
          </Input>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </Input>

          <GroupedFormField>
            <GroupedButton submit isLink>
              Login
            </GroupedButton>
            <GroupedButton onClick={() => navigate("/registration")}>
              Register
            </GroupedButton>
          </GroupedFormField>
        </form>
      </div>
    </Container>
  );
};
export default Login;
