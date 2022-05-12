import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";
import ReactPaginate from 'react-paginate';

var rows = [];
var items = [1,2,3,4,5,6,7,8,9,0,11,12];
function Items({ currentItems, history }) {

    const itemClick = (event) =>{
        debugger;
        let id = event.target.parentElement.dataset.key;
        history("/viewLostPetDetails/" + id);
    }

    return (
      <>
          {currentItems && currentItems.map(res =>
            <div className="card col-2 m-3" onClick={itemClick}  data-key={res.pet_id}>
                <img className="card-img-top" src={res.photo} width="200" height="200" alt="Card image cap" />
                <div className="card-body" data-key={res.pet_id}>
                    <h5 className="card-title text-success">Name: {res.pet_name}</h5>
                    <p className="card-text"><small className="text-info">Breed: {res.breed}</small></p>
                    <p className="card-text"><small className="text-muted">Gender: {res.gender}</small></p>
                    <p className="card-text"><small className="text-muted">Color: {res.color}</small></p>
                    <p className="card-text"><small className="text-muted">{res.last_seen_date} {res.last_seen_time}</small></p>
                </div>
            </div>
            )}
      </>
    );
  }

function PaginatedItems({ itemsPerPage, rowsItem, history }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      let itemsRow = rowsItem.slice(itemOffset, endOffset);
      setCurrentItems(itemsRow);
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <div className="row justify-content-md-center">
            <Items currentItems={currentItems} history={history}/>
        </div>
        <div className="row justify-content-md-center">
            <div className="col-3">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            
        </div>
        
       
      </>
    );
  }
  


function ViewLostPetDetails() {

    Axios.defaults.withCredentials = true;
    const history=useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [base64String, setmageFile] = useState()
    
   
    useEffect(() => {
        Axios.get('http://localhost:3001/displaylostpetinfo').then(function(res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        }).then(function(error) {
            console.log(error);
        });
    }, []);
 
    return (
        <div>
            <Navigator></Navigator>
            {loading ? (
        <div className="text-center">
          .....
        </div>
      ) : 
        ( <PaginatedItems itemsPerPage={4} rowsItem={rows} history={history}/>)}
        </div>
    );
}
export default ViewLostPetDetails;