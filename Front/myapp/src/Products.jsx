import { useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

const Products = () => {
    let temp = useParams().categoryId
    const [prods, setprods] = useState([])
    useEffect(async () => {
        const res =await axios.get(`http://127.0.0.1:8000/categories/${temp}/products/`)
        setprods(res.data)
        console.log(res.data);
    }, [])

    return (
        <div>Products
            {/* {prods.length} */}
            {/* <h1> {useParams().categoryId}</h1> */}
        </div>
    )
}

export default Products