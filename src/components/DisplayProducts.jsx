import './DisplayProducts.css';
import SmartBasketCard from './SmartBasketCard';
import { useState, useEffect } from 'react';

function DisplayProducts({ products }) {
    const [productNotEmpty, setProductNotEmpty] = useState(true);

    function isProductEmpty() {
        if (products == null || products.length === 0 || products == undefined) {
            products = [];
            setProductNotEmpty(false);
        }
    }

    useEffect(() => {
        isProductEmpty();
    }, [])
    return (
        <>
            {productNotEmpty ?
                        <div className='column-divider'>
                            <div className="content-main">
                                {!(products.length === 0) &&
                                    products.map((product, key) => (
                                        <SmartBasketCard
                                            key={key}
                                            name={product.title}
                                            productId={product._id}
                                            imageUrl={product.productUrl}
                                            discountPercent={product.discountPercentage}
                                            currentPrice={product.sellingPrice}
                                            originalPrice={product.originalPrice}
                                            isHarDinSasta={product.isHarDinSasta}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                : <span>Data not found!</span>
            }
        </>
    );
}
export default DisplayProducts;