import Items from './components/Items.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Nandini() {
    const text = {
        nav: 'All Brands / Nandini',
        items: 'Nandini',
    }

    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const formData = {
        'category': 'Nandini',
    }

    async function fetchData(){
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/displayProductsOnCategory`, formData, {});
        setProducts(res.data.products);
        setFetchedProducts(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {fetchedProducts && <Items text={text} products={products} /> }
        </>
    );
}
