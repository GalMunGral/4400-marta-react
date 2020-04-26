import React, { useContext, useState } from "react";
import { Redirect } from "@reach/router";
import axios from "axios";
import { UserContext } from "../../contexts";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { Radio, Option } from "../../components/common/Radio";

const Registraion = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [useExistingCard, setUseExistingCard] = useState(true);
  const [breezecardNum, setBreezecardNum] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (password1 !== password1) {
      alert("password do not match");
      return;
    }
    await axios.post("/api/auth/register", {
      username,
      email,
      password,
      breezecardNum: useExistingCard ? breezecardNum : "",
    });
    setUser({
      username: username,
      userType: "PASSENGER",
    });
  };

  if (user) return <Redirect to="/login" noThrow />;

  return (
    <Container>
      <div className="box">
        <header className="title is-1">Registration</header>
        <form onSubmit={register}>
          <Input value={username} onChange={(e) => setUsername(e.target.value)}>
            Username
          </Input>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </Input>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </Input>
          <Input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          >
            Confirm Password
          </Input>

          <Radio label="Please choose one:">
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
            onChange={(e) => setBreezecardNum(e.target.value)}
          />

          <Button submit isLink>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Registraion;
