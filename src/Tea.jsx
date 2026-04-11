import { useState, useEffect } from 'react';
import axios from 'axios';
import Items from './components/Items.jsx';

export default function Tea() {
    const text = {
        nav: 'Beverages / Tea',
        items: 'Tea',
    }

    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const formData = {
        'category': 'Tea',
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