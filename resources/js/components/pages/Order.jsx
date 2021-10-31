import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Stack, Button, Form, Modal, Table } from 'react-bootstrap'

const Order = () => {
    const [add, setAdd] = useState(false)
    const [codecustomer, setCodecustomer] = useState(null)
    const [customername, setCustomername] = useState('')
    const [codeitem, setCodeitem] = useState(null)
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    const [customer, setCustomer] = useState([])
    const [item, setItem] = useState([])
    const [order, setOrder] = useState([])

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const addOrder = () => {
        try {
            const fdata = {
                code_customer: codecustomer,
                date: date,
                code_item: codeitem,
                city: city,
                qty: qty,
                discount: discount,
                price: price
            }
            axios.post('/api/order',fdata).then((res)=>{
                if(res.status === 201){
                    clearForm();
                    getOrder();
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const getOrder = async() => {
        try {
            let res = await axios.get('/api/order')
            setOrder(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getItem = async() => {
        try {
            let res = await axios.get('/api/item')
            setItem(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getCustomer();
        getItem();
        getOrder();
    },[])

    const clearForm = () => {
        setAdd(false)
        setCodecustomer(null)
        setCustomername('')
        setCodeitem(null)
        setCity('')
        setDate('')
        setQty(0)
        setPrice(0)
        setDiscount(0)
        setDiscount(0)
    }
    return (
        <Container>
            <h1>Order List</h1>
            <Stack gap={2} direction="horizontal">
                <Button variant="secondary" onClick={()=>setAdd(true)}>Add Order</Button>
                <div className="ms-auto">
                    <Form.Control placeholder="Search.."/>
                </div>
            </Stack>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:50}}>No</th>
                        <th>Customer Code</th>
                        <th>Item Code</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((ol,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{ol.code_customer}</td>
                            <td>{ol.code_item}</td>
                            <td>{ol.qty}</td>
                            <td>{ol.price}</td>
                            <td>{ol.qty * ol.price}</td>
                            <td>
                                <Button variant="secondary">Edit</Button> &nbsp;
                                <Button varian="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add */}
            <Modal show={add} onHide={()=>{
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Customer</Form.Label>
                        <Form.Select onChange={(e)=>{
                           if(e.target.value !== ''){
                            setCodecustomer(JSON.parse(e.target.value).code)
                            setCity(JSON.parse(e.target.value).city)
                           }else{
                               setCodecustomer(null)
                               setCity('')
                           }
                        }}>
                            <option value={''}>Select Customer</option>
                            {customer.map((l,i)=>(
                                <option value={JSON.stringify(l)} key={i}>{l.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" onChange={(e)=>setDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Item</Form.Label>
                        <Form.Select onChange={(e)=>{
                            if(e.target.value !== ''){
                                setCodeitem(JSON.parse(e.target.value).code)
                            }else{
                                setCodeitem(null)
                            }
                        }}>
                            <option value="">Select Item</option>
                            {item.map((il,i)=>(
                                <option value={JSON.stringify(il)} key={i}>{il.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>QTY</Form.Label>
                        <Form.Control type="number" placeholder="QTY" onChange={(e)=>setQty(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="number" placeholder="Discount" onChange={(e)=>setDiscount(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total</Form.Label>
                        <Form.Control type="number" value={(qty*price)- discount} disabled/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addOrder}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Order
