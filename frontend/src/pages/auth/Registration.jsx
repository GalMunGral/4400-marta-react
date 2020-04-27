import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { UserContext } from "../../contexts";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Form from "../../components/common/Form";
import Container from "../../components/common/Container";
import { Radio, Option } from "../../components/common/Radio";
import useNotification from "../../hooks/Notification";

const Registraion = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [useExistingCard, setUseExistingCard] = useState(true);
  const [breezecardNum, setBreezecardNum] = useState("");
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const register = async () => {
    if (password !== password1) {
      notify("ERROR", "Passwords do not match");
      return;
    }
    try {
      await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
          breezecardNum: useExistingCard ? breezecardNum : "",
        },
        { cancelToken: source.token }
      );
      setUser({
        username: username,
        userType: "PASSENGER",
      });
      notify("INFO", "Success!");
    } catch (error) {
      notify("ERROR", "Registration failed");
    }
  };

  useEffect(() => () => source.cancel(), []);

  if (user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <Card>
        <Header>Registration</Header>
        <Form onSubmit={register}>
          <Input value={username} onChange={setUsername} required>
            Username
          </Input>
          <Input type="email" value={email} onChange={setEmail} required>
            Email
          </Input>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            required
          >
            Password
          </Input>
          <Input
            type="password"
            value={password1}
            onChange={setPassword1}
            required
          >
            Confirm Password
          </Input>
          <Radio label="Please choose one:" required>
            <Option
              checked={useExistingCard}
              onChange={() => setUseExistingCard(true)}
            >
              I already have a Breeze Card
            </Option>
            <Option
              checked={!useExistingCard}
              onChange={() => setUseExistingCard(false)}
            >
              Get a new card
            </Option>
          </Radio>
          <Input
            disabled={!useExistingCard}
            value={breezecardNum}
            onChange={setBreezecardNum}
          />
          <Button submit isLink>
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Registraion;
