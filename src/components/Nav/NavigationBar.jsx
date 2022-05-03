import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsbyName } from '../../redux/actions/productActions';
import './NavigationBar.css'

function NavigationBar() {

  const user = useSelector( (state) => state.userReducer.usuario)

  useEffect(() => {
    console.log(user)

  }, [user])
  /**
     //!--------- BUSQUEDA ----------------------------------
  **/
     const[name, setName] = useState('')
     const dispatch = useDispatch();

     function handleInputChange(event) {
         event.preventDefault();
         setName(event.target.value.toLowerCase());
         console.log(name, 'HandleChange')
     }
   
     function handleSubmit(event) {
         event.preventDefault();
         dispatch(getProductsbyName(name))
         setName('');
         console.log(name, 'HandleSubmit')
     }
   
  return (

<Navbar bg="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand className='titleNavBar' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px', color: 'white' }}
        navbarScroll
      >
        <Nav.Link href="/" style={{ maxHeight: '100px', color: 'white' }}>Inicio</Nav.Link>
        <Nav.Link href="/home" style={{ maxHeight: '100px', color: 'white' }}>Catalogo</Nav.Link>
        {
          user.name ?
          <Nav.Link href="/carrito" style={{ maxHeight: '100px', color: 'white' }}> {user.name} </Nav.Link>
          :

        <Nav.Link href="/login" style={{ maxHeight: '100px', color: 'white' }}>Iniciar sesion</Nav.Link>
        }
        
      </Nav>
      <Form className="d-flex"  onSubmit={(e) => handleSubmit(e)}>
        <FormControl
          type="search"
          placeholder="Buscar producto"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {handleInputChange(e)}}
        />
        <Button type="submit" variant="outline-warning">Buscar</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default NavigationBar