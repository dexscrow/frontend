import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination(prop){
	const {setFrom,pageCount,getRecords} = prop;
	const handlePageClick = (event) => {
		setFrom(event.selected);
		//getRecords();
	 };

    return (
      <>   
	    <ReactPaginate
		breakLabel="..."
		nextLabel="&nbsp;&nbsp;next >"
		onPageChange={handlePageClick}
		pageRangeDisplayed={5}
		pageCount={pageCount}
		previousLabel="< previous&nbsp;&nbsp;"
		renderOnZeroPageCount={null}
		className="d-flex justify-content-center flex-wrap text-white"
		/>
     </>
    )
}