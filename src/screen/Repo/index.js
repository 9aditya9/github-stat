import React from "react";
import Card from "../../components/Card";
import { GetRepos, fetchRepos } from "../../services/RepoService";
// import { GetTags } from "../../services/RepoService";
import "./styles.css";
import ReactPaginate from "react-paginate";
import RingLoader from "react-spinners/RingLoader";
import Pagination from "../Pagination";

const Repo = ({ username = "9aditya9" }) => {
  const [repos, setRepos] = React.useState([
    {
      name: "",
      description: "",
    },
  ]);
  const [timer, setTimer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [errorOccured, setErrorOccured] = React.useState(false);
  let limit = 10;

  // debounce function
  function debounce(func, timeout = 600) {
    return (...args) => {
      clearTimeout(timer);
      const t = setTimeout(func, timeout);
      setTimer(t);
    };
  }
  async function handleApiCall() {
    await GetRepos({ username })
      .then((data) => {
        console.log(data);
        setPageCount(data.last);
        setRepos(data.data);
        setLoading(true);
        setErrorOccured(false);
      })
      .catch((err) => {
        setLoading(true);
        setErrorOccured(true);
        setPageCount(0);
        console.log(err);
      });
  }
  const handleDebounce = debounce(handleApiCall);

  React.useEffect(() => {
    setLoading(false);
    setCurrentPage(0);
    // console.log("cp" + currentPage);
    handleDebounce();
  }, [username]);

  // getting tags of the specific repo
  // const handleTag = (tags_url) => {
  //   console.log(tags_url);
  //   GetTags({ link: tags_url })
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // pagination functionality
  const handlePageClick = async (data) => {
    setLoading(false);
    console.log(data);
    setCurrentPage(data.selected);
    const selectedPage = data.selected + 1;
    await fetchRepos({ username, limit, selectedPage })
      .then((data) => {
        setRepos(data);
        setLoading(true);
        setErrorOccured(false);
      })
      .catch((err) => {
        setLoading(true);
        setErrorOccured(true);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="repo-container" style={{ backgroundColor: "white" }}>
        {loading ? (
          errorOccured ? (
            <h1>Kindly check the username</h1>
          ) : (
            repos.map((repo) => (
              <Card
                key={repo.id}
                repo={repo}
                name={repo.name}
                desc={repo.description}
                // tags={handleTag(repo.tags_url)}
                time={String(repo.created_at).split("T")[0]}
                topics={repo.topics}
              />
            ))
          )
        ) : (
          <RingLoader />
        )}
      </div>
      {pageCount > 1 ? (
        <Pagination
          pagecount={pageCount}
          currentpage={currentPage}
          handlepagechange={handlePageClick}
        />
      ) : null}


    </div>
  );
};

export default Repo;
