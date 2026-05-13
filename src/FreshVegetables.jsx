import Items from './components/Items.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from './utils/Toast.jsx';

function FreshVegetables() {
    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);
    const [loading, setLoading] = useState(true);

    const formData = {
        'category': 'Fresh Vegetables',
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

    const text = {
        nav: 'Fruits & Vegetables / Fresh Vegetables',
        items: 'Fresh Vegetables',
    }

    return (
        <>
            <Toast isShow={loading}/>
            {fetchedProducts && <Items text={text} products={products} /> }
        </>
    );
}

export default FreshVegetables;