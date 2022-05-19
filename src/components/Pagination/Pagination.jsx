import React, { useEffect } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { GrNext, GrPrevious } from 'react-icons/gr';
import './Pagination.css'

function Paged({prodsLength, prodPerPage, Page, currentPage, prodsFinal, setCurrentPage}) {
    
    const pageNumber = [];




    const next = () => {
        Page(currentPage + 1);
        
        if(currentPage >= pageNumber.length - 1){
            setCurrentPage(1);
        }
    }


    const prev = () => {
        Page(currentPage - 1);

        if(currentPage <= 1){
            setCurrentPage(1);
        }
    }

    for (let i = -1; i <  Math.ceil(prodsLength/prodPerPage); i++) {
        pageNumber.push(i + 1);
    }
    delete pageNumber[0];
    return (
        <div className="PagedDiv">

            <nav  className="PagedNav">
                <ul className="ulPaged">
            <Button onClick={() => prev()}><GrPrevious/> </Button>
                    {
                        pageNumber && pageNumber.map(num => (
                            <>
                            <Pagination onClick={()=> Page(num)} key={num} style={{display: 'inline-block', margin: '0 1%'}} >
                                    {
                                currentPage === pageNumber[num] ?
                                <Pagination.Item active>{[num]}</Pagination.Item>
                                :
                                <Pagination.Item>{num}</Pagination.Item>
                                    }
                                     
                            </Pagination>
                            </>
                        ))
                    }
                    <Button onClick={() => next()}> <GrNext/> </Button>
                </ul>
            </nav>
        </div>
    )
}

export default Paged
