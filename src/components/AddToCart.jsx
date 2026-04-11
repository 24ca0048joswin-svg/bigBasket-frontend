import './AddToCart.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartItems from './CartItems';
import { CartContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

function AddToCart() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [total, setTotal] = useState(0);
    const [savings, setSavings] = useState(0);
    const [isCartEmpty, setIsCartEmpty] = useState(false);

    const { cart, clearCart } = useContext(CartContext);

    async function fetchProducts() {
        if (cart.length === 0) {
            setProducts([]);
            setLoaded(true);
            return;
        }

        try {
            const productIds = cart.map(item => item.id);

            const res = await axios.post('http://localhost:3000/product/prodUsingIds', {
                ids: productIds
            });

            setProducts(res.data.products || []);

            let calculatedTotal = 0;
            let calculatedSavings = 0;
            res.data.products.forEach(prod => {
                const cartItem = cart.find(item => item.id === prod._id);
                if (cartItem) {
                    const itemTotal = prod.sellingPrice * cartItem.quantity;
                    calculatedTotal += itemTotal;
                    calculatedSavings += (prod.originalPrice - prod.sellingPrice) * cartItem.quantity;
                }
            });

            setTotal(calculatedTotal);
            setSavings(calculatedSavings);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoaded(true);
        }
    }

    function calculation() {
        let calculatedTotal = 0;
        let calculatedSavings = 0;
        products.forEach(prod => {
            const cartItem = cart.find(item => item.id === prod._id);
            if (cartItem) {
                const itemTotal = prod.sellingPrice * cartItem.quantity;
                calculatedTotal += itemTotal;
                calculatedSavings += (prod.originalPrice - prod.sellingPrice) * cartItem.quantity;
            }
        });

        setTotal(calculatedTotal);
        setSavings(calculatedSavings);
    }

    useEffect(() => {
        fetchProducts();
        if (cart.length === 0) {
            setIsCartEmpty(true);
        }
    }, []);

    useEffect(() => {
        calculation();
    }, [cart]);

    return (
        <>
            {
                !isCartEmpty ?
                    <div className="box add-to-cart flex-column">
                        <h1>Add to Cart Page</h1>

                        <table>
                            <thead>
                                <tr className='tr-heading'>
                                    <td>Item Description</td>
                                    <td>Unit Price</td>
                                    <td>Quantity</td>
                                    <td>SubTotal</td>
                                    <td>Saving</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoaded ? (
                                    products.map((prod) => {
                                        const cartItem = cart.find(item => item.id === prod._id);
                                        if (!cartItem) return null;

                                        return (
                                            <CartItems
                                                key={prod._id}
                                                product={prod}
                                                quantity={cartItem.quantity}
                                                setTotal={setTotal}
                                                setSavings={setSavings}
                                            />
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6">Loading cart items...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table className='width-70'>
                            <tfoot>
                                <tr className='tr-heading'>
                                    <td>Total</td>
                                    <td>Savings</td>
                                </tr>
                                <tr>
                                    <td>₹{total}</td>
                                    <td>₹{savings}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <button className='red-btn' onClick={clearCart}>
                            Empty Cart
                        </button>
                        <button className='red-btn'>
                            <Link to="/checkout" style={{
                                'color': 'white',
                                'textDecoration': 'none',
                            }}>Buy</Link>
                        </button>
                    </div>

                    :

                    <h1 className='center-text' style={{ 'margin': '15px' }}>
                        Cart is Empty!
                    </h1>
            }
        </>
    );
}

export default AddToCart;