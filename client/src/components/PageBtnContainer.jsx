import React from 'react'
import {HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';
const PageBtnContainer = () => {
    const{data:{numberOfPages, currentPage}} = useAllJobsContext();
    const pages = Array.from({length: numberOfPages}, (_,index) => {
        return index+1;
    });
    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    }
    const addPageButton = ({pageNumber, activeClass}) => {
        return <button 
            className={`btn page-btn ${activeClass && 'active'}`} 
            key={pageNumber} 
            onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}</button>
    } 
    const renderPageButtons = () => {
        const pageButtons = [];
        //first page
        pageButtons.push(addPageButton({pageNumber: 1, activeClass: currentPage === 1}));
        // dots
        if(currentPage > 3) {
            pageButtons.push(<span className='page-btn dots' key='dots-1'>...</span>)
        }
        // one before curretn page
        if(currentPage !== 1 && currentPage !== 2){
            pageButtons.push(addPageButton({
                pageNumber: currentPage-1,
                activeClass: false
            }))
        }
        // current page
        if(currentPage !== 1 && currentPage != numberOfPages){
            pageButtons.push(addPageButton({pageNumber: currentPage, activeClass: true}));
        }   
       // one after current page
        if(currentPage !== numberOfPages && currentPage !== numberOfPages-1){
            pageButtons.push(addPageButton({
                pageNumber: currentPage+1,
                activeClass: false
            }))
        }
        // dots
        if(currentPage < numberOfPages-2) {
            pageButtons.push(<span className='page-btn dots' key='dots-2'>...</span>)
        }
        //last page
        pageButtons.push(addPageButton({pageNumber: numberOfPages, activeClass: currentPage === numberOfPages}));
        return pageButtons;
    }
  return (
    
    <Wrapper>
      <button className='btn prev-btn' onClick={() => {
        let prevPage = currentPage - 1;
        if(prevPage < 1) prevPage = numberOfPages;

        handlePageChange(prevPage);
      }}> 
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {renderPageButtons()}
      </div>
      <button className='btn next-btn' onClick={() => {
        let nextPage = currentPage + 1;
        if(nextPage > numberOfPages) nextPage = 1;

        handlePageChange(nextPage);
      }}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
