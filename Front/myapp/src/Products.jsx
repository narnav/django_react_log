import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Pay from "./Pay";

const Products = () => {
    const { categoryId } = useParams();
    const [prods, setProds] = useState([]);
    const [cart, setcart] = useState([])
    const [refreshFlag, setrefresh] = useState(false)
    const [total, settotal] = useState(0)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/categories/${categoryId}/products/`)
            .then(res => setProds(res.data))
    }, [categoryId]);

    useEffect(() => {
        // update display
        let temp=0
        cart.forEach(prd => (temp+= prd.amount * prd.price))
        settotal(temp)
    }, [cart,refreshFlag])



    const add2Cart = (prod, amount) => {
        if (cart.filter(prd => prd.id === prod.id).length) {
            const found = cart.find((element) => element.id === prod.id)
            if(found.amount +amount ==0 )//check if amount equal 0
            {//remove zero amount product
                setcart(cart.filter((element) => element.id != prod.id))
            }else{
                found.amount += amount
            }
            setrefresh(!refreshFlag)
        } else {
            let orderItem = { id: prod.id, name: prod.name, amount: 1, price: prod.price }
            setcart([...cart, orderItem])
        }
    }

    return (
        <div >
            <h1>Category: {categoryId}</h1>
            <div>
                {prods.map((product, ind) => (
                    <div key={ind}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <button onClick={() => add2Cart(product, 1)}>BUY</button>
                    </div>
                ))}
                <h1>Your cart, only {total}</h1>
                {cart.map((product, ind) => (
                    <div key={ind} style={{ backgroundColor: "rgb(195, 198, 215)" }}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <div><button onClick={() => add2Cart(product, -1)}>-</button> Amount: {product.amount}<button onClick={() => add2Cart(product, 1)}>+</button></div>
                    </div>
                ))}
            </div>
            <Pay></Pay>
        </div>
    );
}

export default Products;