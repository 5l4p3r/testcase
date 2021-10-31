import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container,Button, Form, Stack, Table, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Item = () => {
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)
    const [id, setId] = useState(0)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')
    const [item, setItem] = useState([])

    const getItem = async() => {
        try {
            let res = await axios.get('/api/item')
            setItem(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    const clearForm = () => {
        setAdd(false)
        setEdit(false)
        setDel(false)
        setId(0)
        setCode('')
        setName('')
    }
    const addItem = () => {
        try {
            if(code === '' || name === ''){
                Swal.fire('Form is empty')
            }
            const fdata = {
                code: code,
                name: name
            }
            axios.post('/api/item',fdata).then(()=>{
                clearForm();
                getItem();
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const editItem = () => {
        try {
            if(name === ''){
                Swal.fire('Name is empty')
            }
            const fdata = {
                id:id,
                code: code,
                name: name
            }
            axios.put('/api/item',fdata).then((res)=>{
                if(res.status === 200){
                    clearForm();
                    getItem();
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteItem = () => {
        try {
            axios.delete(`/api/item/${id}`).then(()=>{
                clearForm();
                getItem();
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getItem();
    },[])
    return (
        <Container>
            <h1>Data Master Item</h1>
            <Stack gap={2} direction="horizontal">
                <Button variant="secondary" onClick={()=>setAdd(true)}>Add Item</Button>
                <div className="ms-auto">
                    <Form.Control placeholder="Search..."/>
                </div>
            </Stack> <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:50}}>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th style={{width:145}}>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((l,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{l.code}</td>
                            <td>{l.name}</td>
                            <td>
                                <Button variant="success" onClick={()=>{
                                    setId(l.id)
                                    setCode(l.code)
                                    setName(l.name)
                                    setEdit(true)
                                }}>Edit</Button> &nbsp;
                                <Button variant="danger" onClick={()=>{
                                    setId(l.id)
                                    setName(l.name)
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
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Code</Form.Label>
                        <Form.Control placeholder="Code.." onChange={(e)=>setCode(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Name.." onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={addItem}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit*/}
            <Modal show={edit} onHide={()=>{
                clearForm();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Code</Form.Label>
                        <Form.Control value={code} disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Name..." defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={editItem}>Save</Button>
                    <Button variant="danger" onClick={clearForm}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete */}
            <Modal show={del} onHide={()=>{
                setDel(false)
                setName('')
            }}>
                <Modal.Header>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure delete {name} ?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={deleteItem}>Yes</Button>
                    <Button variant="secondary" onClick={()=>{
                        setDel(false)
                    }}>No</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Item
