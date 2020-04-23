import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts";
import { Redirect } from "react-router";
import axios from "axios";

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
    <React.Fragment>
      <header>Registration</header>
      <form onSubmit={register}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div>
          <input
            type="radio"
            name="chooseCard"
            checked={useExistingCard}
            onChange={() => setUseExistingCard(true)}
          />
          <label>Use my existing Breeze Card</label>
          <input
            disabled={!useExistingCard}
            placeholder="Card Number"
            value={breezecardNum}
            onChange={(e) => setBreezecardNum(e.target.value)}
          />
          <input
            type="radio"
            name="chooseCard"
            checked={!useExistingCard}
            onChange={() => setUseExistingCard(false)}
          />
          <label>Get a new Breeze Card</label>
        </div>
        <button>Register</button>
      </form>
    </React.Fragment>
  );
};

export default Registraion;
