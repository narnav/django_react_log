import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route ,Routes} from "react-router-dom"
import Products from './Products';
import Cats from './Cats';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<h1>please select category</h1>}></Route>
                    <Route path="categories" element={<Cats />} >
                        <Route path=":categoryId" element={<Products />} />
                        {/* <Route path="/categories/products" element={<Products />} /> */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
