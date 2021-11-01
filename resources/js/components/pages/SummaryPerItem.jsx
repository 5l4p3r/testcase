import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'

const SummaryPerItem = () => {
    const [report, setReport] = useState([])

    const getReport = async() => {
        try {
            let res = await axios.get('/api/report/item')
            setReport(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getReport();
    },[])
    return (
        <Container>
            <h1>Summary Report Order per Item</h1>
            <div className="py-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Item Code</th>
                            <th>Item name</th>
                            <th>QTY</th>
                            <th>AVG</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.code_item}</td>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.avg}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default SummaryPerItem
