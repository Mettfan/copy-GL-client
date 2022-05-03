import React, { useEffect, useState } from 'react'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsbyCategory, getProductsbyPrice } from '../../redux/actions/productActions';
import { Button, Card, Container, Nav, Navbar, NavDropdown, Pagination, Spinner } from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavigationBar from '../Nav/NavigationBar';
import Paged from '../Pagination/Pagination';

function Home() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productReducer.productos);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(productos);

  /**
     //!--------- PAGINADO ----------------------------------
  **/
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage] = useState(15);
  const lastIndexProd = currentPage * prodPerPage;
  const firstIndexProd = lastIndexProd - prodPerPage;
  const currentProds = productos.slice(firstIndexProd, lastIndexProd);
  console.log(currentProds);
  const Page = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const filterCategory = (category) => {
    dispatch(getProductsbyCategory(category));
  };

  const filterPrice = (format) => {
    dispatch(getProductsbyPrice(format));
  };

  return (
    <>

    {/* <NavigationBar/> */}

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavDropdown title="Categorias" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Buzo')}>
                  Buzos
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Remera')}>
                  Remeras
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Campera')}>
                  Camperas
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Pantalon')}>
                  Pantalones
                </NavDropdown.Item>

              </NavDropdown>



              <NavDropdown title="Precio" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('ASC')}>
                ASC
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('DESC')}>
                DESC
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="containerCardsHome">
        {productos.length > 0 ? (
          currentProds.map((producto) => (
            <>
              <Card
                style={{ width: "18rem", marginBottom: "2%", height: "33rem" }}
                key={producto.id}
              >
                <Link
                  to={"/producto/" + producto.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={producto.image} />
                  <Card.Title style={{ height: "55px", marginTop: "2%" }}>
                    {producto.name}
                  </Card.Title>

                </Link>
                <p style={{ height: "35px" }}>${producto.price}</p>
                <div className="cardsProductsButtons">
                  <Button
                    className="cardsProductsButton"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                  >
                    <CgShoppingCart />
                  </Button>
                  <Button
                    className="cardsProductsButton"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                  >
                    {" "}
                    <MdOutlineFavoriteBorder />{" "}
                  </Button>
                </div>
              </Card>
            </>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
      <div className={"PagedHome"}>
        <Paged
          prodPerPage={prodPerPage}
          prodsLength={productos.length}
          Page={Page}
        />
      </div>
    </>
  );
}

export default Home