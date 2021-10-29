import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './layout/Nav'
import { UserContext } from './hooks/UserContext'
import axios from 'axios'
import Customer from './pages/Customer'

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
