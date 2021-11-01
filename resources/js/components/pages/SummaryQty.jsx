import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'

const SummaryQty = () => {
    const [sumqty, setSumqty] = useState([])

    const getSumQTY = async() => {
        try {
            let res = await axios.get('/api/report/qty')
            setSumqty(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getSumQTY();
    },[])
    return (
        <Container>
            <h1>Summary Report Order per QTY</h1>
            <div className="py-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Code Customer</th>
                            <th>Customer Name</th>
                            <th>QTY</th>
                            <th>Subtotal</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sumqty.map((l,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{l.date}</td>
                                <td>{l.code_customer}</td>
                                <td>{l.name}</td>
                                <td>{l.qty}</td>
                                <td>{l.subtotal}</td>
                                <td>{l.discount}</td>
                                <td>{l.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default SummaryQty
