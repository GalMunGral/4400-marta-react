import React, { useState, useContext } from "react";
import { Redirect, useNavigate } from "@reach/router";
import axios from "axios";
import { UserContext } from "../../contexts";
import Container from "../../components/common/Container";
import Input from "../../components/common/Input";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Form from "../../components/common/Form";
import {
  GroupedFormField as Field,
  GroupedButton as Button,
} from "../../components/common/GroupedFormField";
import useNotification from "../../hooks/Notification";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = useNotification();

  const source = axios.CancelToken.source();

  const login = async () => {
    try {
      const { data } = await axios.post(
        `/api/auth/login`,
        {
          username,
          password,
        },
        { cancelToken: source.token }
      );
      const { success, userType } = data;
      if (success) {
        setUser({ username, userType });
        localStorage.setItem("username", username);
        localStorage.setItem("userType", userType);
      } else {
        throw "Login failed";
      }
    } catch (error) {
      notify("ERROR", "Login failed");
    }
  };

  if (user) {
    return (
      <Redirect
        to={user.userType === "ADMIN" ? "/admin-dashboard" : "/my-trip"}
        noThrow
      />
    );
  }

  return (
    <Container>
      <Card>
        <Header>Login</Header>
        <Form onSubmit={login}>
          <Input type="text" value={username} onChange={setUsername}>
            Username
          </Input>
          <Input type="password" value={password} onChange={setPassword}>
            Password
          </Input>
          <Field>
            <Button submit isLink>
              Login
            </Button>
            <Button onClick={() => navigate("/registration")}>Register</Button>
          </Field>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
