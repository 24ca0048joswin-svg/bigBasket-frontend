import Items from './components/Items.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExoticFruits() {
    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const text = {
        nav: 'Fruits & Vegetables / Exotic Fruits & Veggies',
        items: 'Exotic Fruits & Veggies',
    }

    const formData = {
        'category': 'Exotic Fruits',
    }

    async function fetchData(){
        const res = await axios.post("http://localhost:3000/user/displayProductsOnCategory", formData, {});
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