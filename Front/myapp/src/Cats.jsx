import React from 'react'
import { Link, Outlet} from "react-router-dom"
const Cats = () => {
  return (
    <div>
        Cats
        {/* {getStudents().map(cat => <div><Link to={'/categories/products'}>{cat.name}</Link><br/></div>)} */}
        <Link to={'/categories/2'}>Bakery</Link>
        <Link to={'/categories/1'}>Dairy</Link>
        {/* {`/invoices/${invoice.number}`} */}
        <hr/>
        <Outlet></Outlet>
    </div>
  )
}

export default Cats