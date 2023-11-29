import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const Products = () => {
    const { categoryId } = useParams();
    const [prods, setProds] = useState([]);
    const [cart, setcart] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/categories/${categoryId}/products/`)
            .then(res => setProds(res.data))
    }, [categoryId]);

    useEffect(() => {
        console.table(cart);
    }, [cart])
    


    const add2Cart=(prod,amount)=>{
        let orderItem={id:prod.id ,name:prod.name,amount:1,price :prod.price}
        let exist= cart.filter(prd => prd.id === orderItem.id)
        console.table(exist);
        console.table(cart);
        if(exist.length){
            exist[0].amount += amount
            setcart(cart)    
        }else{
        setcart([...cart,orderItem])
        }
    }
    return (
        <div >
            <h1>Category: {categoryId}</h1>
            <div>
                {prods.map((product,ind) => (
                    <div key={ind}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <button onClick={()=>add2Cart(product,1)}>BUY</button>
                    </div>
                ))}
                {cart.map((product,ind) => (
                    <div key={ind} style={{backgroundColor:"rgb(195, 198, 215)"}}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <div><button onClick={()=>add2Cart(product,-1)}>-</button> Amount: {product.amount}<button onClick={()=>add2Cart(product,1)}>+</button></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;