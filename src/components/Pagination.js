import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({
  pageCount,
  onPageChange,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 5,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onPageChange}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      activeClassName={'active'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      previousLabel={'«'}
      nextLabel={'»'}
    />
  )
}

export default Pagination
