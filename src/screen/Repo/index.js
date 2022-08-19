import React from "react";
import Card from "../../components/Card";
import { GetRepos, fetchRepos } from "../../services/RepoService";
import { GetTags } from "../../services/RepoService";
import "./styles.css";
import ReactPaginate from "react-paginate";

const Repo = ({username = "9aditya9"}) => {
  const [repos, setRepos] = React.useState([
    {
      name: "",
      description: "",
    },
  ]);
  const [timer, setTimer] = React.useState("");
  const[pageCount, setPageCount] = React.useState(1);
  const[currentPage, setCurrentPage] = React.useState(1);
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
        console.log(data)
        setPageCount(data.last);
        setRepos(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleDebounce = debounce(handleApiCall);

  React.useEffect(() => {
    handleDebounce();
    setCurrentPage(1);
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
    console.log(data)
    setCurrentPage(data.selected);
    const selectedPage = data.selected + 1;
    const reposFromServer = await fetchRepos({ username, limit, selectedPage });
    setRepos(reposFromServer);
  }



  return (
    <div>
      <div className="repo-container">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            repo={repo}
            name={repo.name}
            desc={repo.description}
            // tags={handleTag(repo.tags_url)}
            topics={repo.topics}
          />
        ))}
      </div>
      <div>
        <ReactPaginate 
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination-container"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}

        />

      </div>
    </div>
  );
};

export default Repo;
