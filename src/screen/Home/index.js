import React, { useState } from "react";
import Profile from "../../components/Profile";
import Repo from "../Repo";
import './styles.css'

const Home = () => {
  const [searched, setSearched] = useState("9aditya9");
  const [userData, setUserData] = useState({});

   const handleChange = (e) => {
    if (e.target.value) {
      setSearched(e.target.value);
    } else {
      setSearched("9aditya9");
    }
  };

  return (
    <div className="home-container">
      <Profile username={searched} />
      <input
        className="user-input"
        onChange={handleChange}
        label="username"
        placeholder="Username :) "
      ></input>
      <Repo username={searched} />
    </div>
  );
};

export default Home;
