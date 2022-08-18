import React from "react";
import Card from "../../components/Card";
import { GetRepos } from "../../services/RepoService";
import { GetTags } from "../../services/RepoService";
import "./styles.css";

const Repo = () => {
  const [repos, setRepos] = React.useState([
    {
      name: "",
      description: "",
    }
  ]);
  const [username, setUsername] = React.useState("9aditya9");
  const [timer, setTimer] = React.useState("");
  
  function debounce(func, timeout = 600) {
    // console.log("hello", func);
    return (...args) => {
      clearTimeout(timer);
      const t = setTimeout(func, timeout);
      setTimer(t);
    };
  }
  async function handleApiCall() {
    await GetRepos({ username })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleDebounce = debounce(handleApiCall);

  React.useEffect(() => {
    handleDebounce();
  }, [username]);

  const handleChange = (e) => {
    if (e.target.value) {
      setUsername(e.target.value);
    } else {
      setUsername("9aditya9");
    }
  };
  
  const handleTag = (tags_url) => {
    console.log(tags_url);
    GetTags({ link: tags_url })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  }

  return (
    <div>
      <input className="user-input" onChange={handleChange} label="username"></input>
      <div className="repo-container">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            repo={repo}
            name={repo.name}
            desc={repo.description}
            tags={handleTag(repo.tags_url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Repo;
