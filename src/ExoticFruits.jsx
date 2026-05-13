import Items from './components/Items.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from './utils/Toast.jsx';

export default function ExoticFruits() {
    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);
    const [loading, setLoading] = useState(true);

    const text = {
        nav: 'Fruits & Vegetables / Exotic Fruits & Veggies',
        items: 'Exotic Fruits & Veggies',
    }

    const formData = {
        'category': 'Exotic Fruits',
    }

    async function fetchData(){
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/displayProductsOnCategory`, formData, {});
        setProducts(res.data.products);
        setFetchedProducts(true);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Toast isShow={loading}/>
            {fetchedProducts && <Items text={text} products={products} /> }
        </>
    );
}