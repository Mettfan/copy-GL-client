import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/actions/productActions'
import { postReview } from '../../redux/actions/reviewActions'
import './MisCompras.css'
import Cookies from 'universal-cookie';

function MisCompras() {
    const dispatch = useDispatch()
    const productos = useSelector( (state) => state.productReducer.productos)

    useEffect(() => {
        dispatch(getProducts())
    },[])


    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [input, setInput] = useState({
      description: "",
      productTitle: "",
    });

    const cookies = new Cookies();
    const user = cookies.get('user')?.user

    function handleSubmit(event) {
      event.preventDefault();
      console.log(input, "submit");
      console.log(rating, "submit");
      console.log(cookies.get('user'), "cookies submit");
      
      dispatch(postReview({comment: input.description, rating: rating, productTitle: input.productTitle, email: cookies.get('user')?.email, name: cookies.get('user')?.user?.name, lastname: cookies.get('user')?.user?.lastName}))

      console.log(input)
      setRating(0);
      setHover(0);
      setInput({
        description: "",
        productTitle: "",
      })
    }


    function handleChange(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }

    console.log(productos, 'productos.name')
  return (
    <div style={{ justifyContent: 'center'}}>

    <h4>Mis compras</h4>

    {
        productos?.slice(0,3).map( (producto) => {
            return (
              <div
                key={producto.id}
                style={{ width: "300px", margin: "2% auto" }}
              >
                <Card>
                  <Card.Img variant="top" src={producto.image} />
                  <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <small className="text-muted">Compra realizada: FECHA</small>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header >Desplegar review</Accordion.Header>
                          <Accordion.Body>
                          <Form onSubmit={ (event) => handleSubmit(event)}>
                  <InputGroup.Text>Escribe tu review</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Escribe tu review"
                    name="description"
                    value={input.description}
                    onChange={(event) => handleChange(event)}
                  />

                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          value={input.rating}
                          name="rating"
                          onChange={(event) => handleChange(event, setRating(index))}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "2%" }}
                    onClick={() => setInput({
                      ...input,
                      productTitle: producto.name
                    })}
                  >
                    Enviar
                  </Button>
                </Form>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </small>
                  </Card.Footer>
                </Card>
              </div>
            );
        })
    }

    </div>
  )
}

export default MisCompras