import './Items.css';
import home from '../assets/home.png';
import SmartBasketCard from './SmartBasketCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Items({ text, products }) {
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
                <div className="main-wrapper">
                    <div className="main-section">
                        <div className="content-header">
                            <div className="content-header-text">
                                <p className='text1'>
                                    <img src={home} alt="home" width="16px" />
                                    {' '}
                                    <Link to="/" className='link'>Home / </Link>
                                    {text.nav}
                                </p>
                                <p className='text2'>
                                    {text.items}
                                </p>
                            </div>
                        </div>
                        <hr className="line" />

                        <div className='column-divider'>
                            <div className="content-main">
                                {!(products.length === 0) &&
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
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : <span>Data not found!</span>
            }
        </>
    );
}
export default Items;