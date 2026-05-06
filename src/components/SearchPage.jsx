import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import SmartBasketCard from './SmartBasketCard';

function SearchPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    async function fetchData() {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/product/searchProducts`, {
                q: query
            });
            setProducts(res.data.data);
            // console.log(res.data.data)
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (query) {
            fetchData();
        }
    }, [query]);

    return (
        <>
            <div className="main-wrapper">
                <div className="main-section">
                    <div className="content-header">
                        <div className="content-header-text">
                            <p className='text1'>
                                <Link to="/" className='link'>
                                    {query ? `Results for "${query}"` : "Search for products"}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <hr className="line" />

                    <div className='column-divider'>
                        <div className="content-main">
                            {!(products.length === 0) ?
                                products.map((product, key) => (
                                    <SmartBasketCard
                                        key={key}
                                        productId={product._id}
                                        name={product.title}
                                        imageUrl={product.productUrl}
                                        discountPercent={product.discountPercentage}
                                        currentPrice={product.sellingPrice}
                                        originalPrice={product.originalPrice}
                                        isHarDinSasta={product.isHarDinSasta}
                                    />
                                ))
                                 : (
                            <h1>Product not found</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchPage;