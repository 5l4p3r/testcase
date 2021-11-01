import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Stack, Button, Form, Modal, Table } from 'react-bootstrap'

const Order = () => {
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)
    const [id, setId] = useState(0)
    const [codecustomer, setCodecustomer] = useState(null)
    const [customername, setCustomername] = useState('')
    const [codeitem, setCodeitem] = useState(null)
    const [nameitem, setNameitem] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [customer, setCustomer] = useState([])
    const [item, setItem] = useState([])
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState('')

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const editOrder = () => {
        try {
            const fdata = {
                id: id,
                qty: qty,
                price: price,
                discount: discount,
            }

            axios.put('/api/order',fdata).then((res)=>{
                if(res.status === 200){
                    clearForm();
                    getOrder();
                }
            })
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
            setOrders(res.data)
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

    const deleteOrder = () => {
        try {
            axios.delete(`/api/order/${id}`).then((res)=>{
                if(res.status === 200){
                    clearForm();
                    getOrder();
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const filtered = (all) => {
        return all.customername.toUpperCase().indexOf(search.toLocaleUpperCase()) > -1
    }

    useEffect(()=>{
        getOrder();
        getCustomer();
        getItem();
    },[])

    const clearForm = () => {
        setId(0)
        setAdd(false)
        setEdit(false)
        setDel(false)
        setCodecustomer(null)
        setCustomername('')
        setCodeitem(null)
        setNameitem('')
        setCity('')
        setDate('')
        setQty(0)
        setPrice(0)
        setDiscount(0)
    }
    return (
        <Container>
            <h1>Order List</h1>
            <Stack gap={2} direction="horizontal">
                <Button variant="secondary" onClick={()=>setAdd(true)}>Add Order</Button>
                <div className="ms-auto">
                    <Form.Control placeholder="Search.." onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </Stack><br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:50}}>No</th>
                        <th>Customer Code</th>
                        <th>Customer Name</th>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th style={{width:145}}>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.filter(filtered).map((ol,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{ol.codecustomer}</td>
                            <td>{ol.customername}</td>
                            <td>{ol.itemcode}</td>
                            <td>{ol.itemname}</td>
                            <td>{ol.qty}</td>
                            <td>{ol.price}</td>
                            <td>{ol.qty * ol.price}</td>
                            <td>
                                <Button variant="success" onClick={()=>{
                                    setEdit(true)
                                    setId(ol.id)
                                    setCustomername(ol.customername)
                                    setCity(ol.city)
                                    setDate(ol.date)
                                    setQty(ol.qty)
                                    setPrice(ol.price)
                                    setNameitem(ol.itemname)
                                    setDiscount(ol.discount)
                                }}>Edit</Button> &nbsp;
                                <Button variant="danger" onClick={()=>{
                                    setId(ol.id)
                                    setDel(true)
                                }}>Delete</Button>
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
                        <Form.Control type="number" placeholder="Discount" defaultValue={discount} onChange={(e)=>setDiscount(e.target.value)}/>
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

            {/* Edit */}
            <Modal show={edit} onHide={()=>{
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control value={date} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control value={customername} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control value={nameitem} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>QTY</Form.Label>
                        <Form.Control defaultValue={qty} type="number" onChange={(e)=>setQty(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control defaultValue={price} type="number" onChange={(e)=>setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control defaultValue={discount} type="number" onChange={(e)=>setDiscount(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={editOrder}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Del */}
            <Modal show={del} onHide={clearForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure delete this order?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={deleteOrder}>Yes</Button>
                    <Button variant="secondary" onClick={clearForm}>No</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Order
