import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import './ProductView.css';
import { CartContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function ProductView() {
    const { productId } = useParams();
    const [title, setTitle] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [selectedHarDinSasta, setSelectedHarDinSasta] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [product, setProduct] = useState();
    const [isAddedToCart, setIsAddedToCart] = useState(true);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    function goBack(){
        navigate(-1);
    }

    const { addToCart, cart, increaseQuantity, decreaseQuantity, removeFromCart} = useContext(CartContext);

    async function fetchData() {
        try {
            const res = await axios.post('http://localhost:3000/admin/displayOneProduct', { id: productId });
            const prod = res.data.product;
            setProduct(prod);
            setTitle(prod.title);
            setOriginalPrice(prod.originalPrice);
            setSellingPrice(prod.sellingPrice);
            setSelectedCategory(prod.category);;
            setSelectedHarDinSasta(prod.isHarDinSasta);
            setDiscount(prod.discountPercentage);
            setPreviewUrl(`http://localhost:3000/static/${prod.productUrl}`);

            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                setCount(cartItem.quantity);
                setIsAddedToCart(false);
            }
        } catch (err) {
            console.log(`An error occured: ${err}`)
        }
    }

    function changeQuantity() {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            setCount(cartItem.quantity);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        changeQuantity();
    }, [cart])

    return (
        <>
            <div className="center-box">
                <div className="two-column-box">
                    <div className="prod-image">
                        <img src={previewUrl} alt="product image" width="400px" />
                    </div>

                    <div className="text-description">
                        <h1 className="title-product">{title}</h1>
                        <h3 className="og-price">MRP: ₹{originalPrice}</h3>
                        <h3 className="price">Price: ₹{sellingPrice}</h3>
                        <h3 className="savings">Savings: {discount}%</h3>
                        {selectedHarDinSasta && (
                            <div className="har-din-sasta">
                                <span className="font-har-din-sasta">Har Din Sasta!</span>
                            </div>
                        )}
                        {isAddedToCart ?
                            <button className="add-btn add-to-cart-btn" onClick={() => {
                                addToCart(productId);
                                setIsAddedToCart(false);
                            }}>Add to cart</button> :
                            <div>
                                <h2>Quantity:</h2>
                                <button className='counter-btn counter-font' onClick={() => increaseQuantity(product._id)}>
                                    +
                                </button>
                                <button className='counter-font counter-btn'>{count}</button>
                                <button className='counter-btn counter-font' onClick={() => decreaseQuantity(product._id)}>
                                    -
                                </button>
                                <br/>
                                <button className='red-btn' onClick={() => {
                                    removeFromCart(product._id);
                                    setIsAddedToCart(true);
                                    alert("Product is removed");
                                }}>Remove Product</button>

                            </div>
                        }


                                <button style={{
                                    color:'red',
                                    border: '1px solid red',
                                    padding:'10px',
                                    borderRadius: '4px',
                                    fontSize : '1.2rem',
                                }}
                                onClick={goBack}
                                >Back</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductView;