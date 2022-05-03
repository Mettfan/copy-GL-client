import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css'

function Paged({prodsLength, prodPerPage, Page}) {
    
    const pageNumber = [];

    for (let i = 0; i <  Math.ceil(prodsLength/prodPerPage); i++) {
        pageNumber.push(i + 1);
    }
    
    return (
        <div className="PagedDiv">

            <nav  className="PagedNav">
                <ul className="ulPaged">
                    {
                        pageNumber && pageNumber.map(num => (
                            <>
                            <Pagination onClick={()=> Page(num)} key={num} style={{display: 'inline-block', margin: '0 1%'}}>
                                <Pagination.Item>
                                    {num}
                                </Pagination.Item>
                            </Pagination>
                            </>
                        ))
                    }
                </ul>
            </nav>

        </div>
    )
}

export default Paged
