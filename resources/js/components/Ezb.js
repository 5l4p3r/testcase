import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './layout/Nav'
import { UserContext } from './hooks/UserContext'
import axios from 'axios'
import Customer from './pages/Customer'
import Item from './pages/Item'
import Order from './pages/Order'
import SummaryQty from './pages/SummaryQty'
import SummaryPerDate from './pages/SummaryPerDate'
import SummaryPerItem from './pages/SummaryPerItem'

const Ezb = () => {
    const [user, setUser] = useState([])
    const getUser = async() => {
        try {
            let res = await axios.get('/me')
            setUser(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getUser();
    },[])
    return (
        <UserContext.Provider value={{
            user: user
        }}>
            <BrowserRouter>
                <Nav/>
                <div className="py-4">
                    <Switch>
                        <Route exact path="/home" component={Home}/>
                        <Route path="/customer" component={Customer}/>
                        <Route path="/item" component={Item}/>
                        <Route path="/order" component={Order}/>
                        <Route path="/summary/qty" component={SummaryQty}/>
                        <Route path="/summary/date" component={SummaryPerDate}/>
                        <Route path="/summary/item" component={SummaryPerItem}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default Ezb
if(document.getElementById('ezb')){
    ReactDOM.render(<Ezb/>,document.getElementById('ezb'))
}
