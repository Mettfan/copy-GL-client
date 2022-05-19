import React, { useState } from 'react'
import { Accordion, Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap'
import { postReview } from '../../redux/actions/reviewActions'
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";

function CardReview({producto}) {
    const dispatch = useDispatch()
    const cookies = new Cookies();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [input, setInput] = useState({
        description: "",
        productTitle: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        
        dispatch(postReview({comment: input.description, rating: rating, productTitle: input.productTitle, email: cookies.get('user')?.email, name: cookies.get('user')?.user?.name, lastname: cookies.get('user')?.user?.lastName}))

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

    return (
        <div 
            key={producto.payment_id}
            className="mis-compras-card"
            style={{ width: "250px", margin: "1%" }}
        >
            <Card
                style={{ "alignItems": "center", color: "#0E1428"}}
            >
                <Card.Img variant="top" src={producto.image}  
                    style={{ width: "150px" }}
                />
                <Card.Body
                    style={{ padding: "5px" }}
                >
                    <Card.Title
                        style={{ height: "15px", "fontSize": "12px" }}
                    >{producto.name}</Card.Title>
                    <small className="text-muted">Talle: {producto.UserProduct?.size}</small>
                    <small style={{ "paddingLeft": "10px" }} className="text-muted">Cantidad: {producto.UserProduct?.quantity}</small>
                </Card.Body>
                <Card.Footer
                    style={{ width: "250px", padding: "0px"}}
                >
                    <small className="text-muted">
                    <Accordion
                        style={{ width: "250px", display: "flex"}}

                    >
                        <Accordion.Item eventKey="0"
                        style={{ width: "250px"}}
                        >
                        <Accordion.Header
                            style={{ color: "#0E1428"}}
                        >Desplegar review</Accordion.Header>
                        <Accordion.Body
                        style={{padding: "0px"}}
                        >
                        <Form onSubmit={ (event) => handleSubmit(event)}>
                <InputGroup.Text>Escribe tu review</InputGroup.Text>
                <FormControl
                    style={{ width: "248px"}}
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
                    style={{ margin: "0% 0 0 0", padding: "0px 5px"}}
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
    )
}

export default CardReview