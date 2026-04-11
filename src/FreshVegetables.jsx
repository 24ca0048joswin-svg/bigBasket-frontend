import Items from './components/Items.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FreshVegetables() {
    const [products, setProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    const formData = {
        'category': 'Fresh Vegetables',
    }

    async function fetchData(){
        const res = await axios.post("http://localhost:3000/user/displayProductsOnCategory", formData, {});
        setProducts(res.data.products);
        setFetchedProducts(true);
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
            {fetchedProducts && <Items text={text} products={products} /> }
        </>
    );
}

export default FreshVegetables;