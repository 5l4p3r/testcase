import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Stack, Table, Button, Modal, Form } from 'react-bootstrap'
import region from '../json/region.json'

const Customer = () => {
    const [add, setAdd] = useState(false)
    const [provinsi, setProvinsi] = useState(region)
    const [kota, setKota] = useState(null)

    const clearForm = () => {
        setKota(null)
    }
    return (
        <Container>
            <Stack gap={3} direction="horizontal">
                <h1>Data Customer</h1> &nbsp;
                <Button variant="secondary" onClick={()=>setAdd(true)}>Add Customer</Button>
                <div className="ms-auto">
                    <Form.Control placeholder="Seacrh..."/>
                </div>
            </Stack> <br />
            <Modal show={add} onHide={()=>{
                setAdd(false);
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Code</Form.Label>
                            <Form.Control placeholder="Code.."/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Name.."/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select onChange={(e)=>{
                                console.log(e.target.value);
                                setKota(e.target.value)
                            }}>
                                {provinsi.map((item,i)=>(
                                    <option value={item.kota} key={i}>{item.provinsi}</option>
                                ))}
                            </Form.Select>
                            {kota !== null &&
                                <Form.Select onChange={(e)=>{
                                    console.log(e.target.value);
                                }}>
                                    {Array(kota).map((item,i)=>(
                                        <option value={item} key={i}>{item}</option>
                                    ))}
                                </Form.Select>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Save</Button>
                    <Button variant="danger">Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Button variant="dark" onClick={()=>{
                console.log(region);
            }}>Test</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:50}}>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A</td>
                        <td>NameA</td>
                        <td>CityA</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>A</td>
                        <td>NameA</td>
                        <td>CityA</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>A</td>
                        <td>NameA</td>
                        <td>CityA</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Customer
