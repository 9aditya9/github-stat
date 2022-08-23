import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pagecount, currentpage, handlepagechange }) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pagecount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlepagechange}
        containerClassName={"pagination-container"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        forcePage={currentpage}
      />
    </div>
  );
};

export default Pagination;
