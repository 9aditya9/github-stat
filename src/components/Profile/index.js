import React, { useState } from "react";
import { GetUser } from "../../services/UserService";
import "./styles.css";

const Profile = ({ username }) => {
  const[data, setData] = useState({});
  const [timer, setTimer] = React.useState("");
  const [errorOccured, setErrorOccured] = React.useState(false);

  function debounce(func, timeout = 600) {
    return (...args) => {
      clearTimeout(timer);
      const t = setTimeout(func, timeout);
      setTimer(t);
    };
  }
  async function handleApiCall() {
    await GetUser({ username })
      .then((dt) => {
        setErrorOccured(false);
        setData(dt);
        console.log(data);
      })
      .catch((err) => {
        setErrorOccured(true);
        console.log(err);
      });
  }
  const handleDebounce = debounce(handleApiCall);

  React.useEffect(() => {
    handleDebounce();
  }, [username]);



  return (
    <div className="profile">
      {errorOccured ? (
        <div className="error">
          <h1>Error Occured</h1>
          </div>
          ) : (
      <div className="container">
        <div className="left">
          <div className="profile-left">
            <img
              // src="https://avatars3.githubusercontent.com/u/17098281?s=460&v=4"
              src={data.avatar_url}
              alt="profile"
              className="profile-img"
            />
          </div>
        </div>
        <div className="profile-right">
          <h1>{username}</h1>
          <h4>{data.bio}</h4>
          <h4>{data.location}</h4>
          {/* <h4>Software Engineer</h4> */}
        </div>
      </div> )}
    </div>
  );
};

export default Profile;
