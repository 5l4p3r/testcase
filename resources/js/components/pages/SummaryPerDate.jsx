import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'

const SummaryPerDate = () => {
    const [report, setReport] = useState([])
    
    const getReport = async() => {
        try {
            let res = await axios.get('/api/report/date')
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
            <h1>Summary Report Order per Date</h1>
            <div className="py-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width: 50}}>No</th>
                            <th>Customer Code</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>QTY</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.qty}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default SummaryPerDate
