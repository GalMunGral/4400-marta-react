import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { UserContext } from "../../contexts";

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

  if (user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="column is-one-third">
        <div className="box">
          <header className="title is-1">Registration</header>
          <form onSubmit={register}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="chooseCard"
                    checked={useExistingCard}
                    onChange={() => setUseExistingCard(true)}
                  />
                  &nbsp;I already have a Breeze Card
                </label>
              </div>
              <div className="control">
                <input
                  className="input"
                  disabled={!useExistingCard}
                  placeholder="Card Number"
                  value={breezecardNum}
                  onChange={(e) => setBreezecardNum(e.target.value)}
                />
              </div>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="chooseCard"
                    checked={!useExistingCard}
                    onChange={() => setUseExistingCard(false)}
                  />
                  &nbsp;Get a new Breeze Card
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registraion;
