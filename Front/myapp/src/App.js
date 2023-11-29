import { Link, Outlet } from 'react-router-dom';
import Cats from './Cats';
import Login from './Login';
import { useState } from 'react';
import Pay from './Pay';
import Register from './Register';

function App() {
    const [logged, setlogged] = useState(false)
    const [userEmail, setEmail] = useState("")

    return (
        <div className="App">
            <Register />
            {logged ? `Welcome ${userEmail}` : "not logged"}
            <Login logged={setlogged} setEmail={setEmail} />
            <Link to={'/categories/2'}>Bakery</Link>|{" "}
            <Link to={'/categories/1'}>Dairy</Link>|{" "}
            <Link to={'/categories/products'}>test</Link>
            <Outlet></Outlet>
        </div>
    );
}

export default App;
