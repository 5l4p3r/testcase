import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Stack, Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import Swal from 'sweetalert2'
import region from '../json/region.json'

const Customer = () => {
    const [add, setAdd] = useState(false)
    const [alert, setAlert] = useState(false)
    const [edit, setEdit] = useState(false)
    const [kota, setKota] = useState(null)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [customer, setCustomer] = useState([])
    const [search, setSearch] = useState('')
    const [id, setId] = useState(null)
    const [del, setDel] = useState(false)

    const clearForm = () => {
        setAdd(false);
        setEdit(false);
        setKota(null);
        setCode('');
        setName('');
        setCity('');
        setAlert(false);
    }

    const addCustomer = () => {
        try {
            if(name === '' || name === '' || city === ''){
                Swal.fire('Failed','Form is Empty','error')
            }
            const fData = {
                code: code,
                name: name,
                city: city
            }
            axios.post('/api/customer',fData).then((res)=>{
                if(res.status === 201){
                    clearForm();
                    getCustomer();
                }
            })
        } catch (error) {
            console.log('Gagal karena ' + error.mesage);
        }
    }

    const editCustomer = () => {
        try {
            const fData = {
                code: code,
                name: name,
                city: city,
            }
            axios.put('/api/customer',fData).then(()=>{
                clearForm();
                getCustomer();
            })
        } catch (error) {
            console.error(error)
        }
    }

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const filtered = (all) => {
        return all.code.toUpperCase().indexOf(search.toUpperCase()) > -1 || 
        all.name.toUpperCase().indexOf(search.toUpperCase()) > -1 || 
        all.city.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    useEffect(()=>{
        getCustomer();
    },[])
    return (
        <Container>
            <h1>Data Master Customer</h1>
            <Stack gap={2} direction="horizontal">
                <Button variant="secondary" onClick={()=>setAdd(true)}>Add Customer</Button>
                <div className="ms-auto">
                    <Form.Control placeholder="Seacrh..." onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </Stack> <br />

            {/* ADD */}
            <Modal show={add} onHide={()=>{
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Code</Form.Label>
                            <Form.Control placeholder="Code.." onChange={(e)=>setCode(e.target.value)}/>
                            {alert && <Alert variant="warning">Code already taken</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Name.." onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select onChange={(e)=>{
                                setKota(e.target.value)
                            }}>
                                <option>Province</option>
                                {region.map((item,i)=>(
                                    <option value={JSON.stringify(item.kota)} key={i}>{item.provinsi}</option>
                                ))}
                            </Form.Select> <br />
                            {kota !== null &&
                                <Form.Select onChange={(e)=>{
                                    setCity(e.target.value)
                                    console.log(e.target.value);
                                }}>
                                    <option>City</option>
                                    {JSON.parse(kota).map((item,i)=>(
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={addCustomer}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT */}
            <Modal show={edit} onHide={()=>{
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Code</Form.Label>
                            <Form.Control placeholder="Code.." defaultValue={code} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Name.." defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select onChange={(e)=>{
                                setKota(e.target.value)
                            }}>
                                <option>Province</option>
                                {region.map((item,i)=>(
                                    <option value={JSON.stringify(item.kota)} key={i}>{item.provinsi}</option>
                                ))}
                            </Form.Select> <br />
                            {kota !== null &&
                                <Form.Select defaultValue={city} onChange={(e)=>{
                                    setCity(e.target.value)
                                    console.log(e.target.value);
                                }}>
                                    <option>City</option>
                                    {JSON.parse(kota).map((item,i)=>(
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editCustomer}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete */}
            <Modal show={del} onHide={()=>{
                setDel(false)
                setName('')
            }}>
                <Modal.Header>
                    <Modal.Title>Delete Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure delete {name} ?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>{
                        axios.delete(`/api/customer/${id}`).then(()=>{
                            setDel(false);
                            getCustomer();
                        })
                    }}>Yes</Button>
                    <Button variant="secondary" onClick={()=>{
                        setDel(false)
                    }}>No</Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:50}}>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>City</th>
                        <th style={{width:145}}>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.filter(filtered).map((item,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                            <td>
                                <Button variant="success" onClick={()=>{
                                    setCode(item.code);
                                    setName(item.name);
                                    setCity(item.city);
                                    setEdit(true);
                                }}>Edit</Button> &nbsp;
                                <Button variant="danger" onClick={()=>{
                                    setId(item.id)
                                    setDel(true)
                                    setName(item.name)
                                }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Customer
